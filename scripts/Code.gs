/**
 * Protronics — Google Apps Script Web App (production)
 *
 * Deploy: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Copy this entire file into the Apps Script editor (Code.gs).
 * Run setupSheets() once before first live submission.
 *
 * Endpoint → NEXT_PUBLIC_FORM_ENDPOINT or NEXT_PUBLIC_FORM_ENDPOINT_URL
 */

var SHEET_TABS = {
  contact: "Contact",
  "product-lead": "Leads",
  "trade-in": "TradeIn",
  newsletter: "Newsletter",
  "service-request": "ServiceRequests",
  "warranty-registration": "Warranty",
};

/** Universal columns on every tab (append-only; never overwrites existing rows). */
var STANDARD_HEADERS = [
  "Timestamp",
  "Form Type",
  "Source Page",
  "Submitted At",
  "Name",
  "Phone",
  "Email",
  "City",
  "Message",
  "Source",
];

/** Extra columns per tab (appended after STANDARD_HEADERS). */
var SHEET_HEADERS = {
  Contact: ["fullName", "phone", "email", "city", "product", "message"],
  Leads: [
    "referenceId",
    "leadType",
    "productName",
    "productId",
    "price",
    "name",
    "phone",
    "city",
    "contactPreference",
    "message",
    "preferredTime",
    "leadSource",
  ],
  TradeIn: [
    "referenceId",
    "name",
    "phone",
    "city",
    "applianceType",
    "brand",
    "model",
    "age",
    "condition",
    "expectedPrice",
    "estimatedLow",
    "estimatedHigh",
    "imageCount",
    "imageNames",
    "leadSource",
  ],
  Newsletter: ["email"],
  ServiceRequests: ["name", "phone", "email", "issue", "preferredTime"],
  Warranty: ["name", "phone", "email", "serialNumber", "purchaseDate", "model"],
};

var MAX_FIELD_LENGTH = 5000;
var MAX_FORM_TYPE_LENGTH = 64;

function doGet() {
  return jsonResponse_(true, "Form webhook healthy", {
    version: "3.0",
    forms: Object.keys(SHEET_TABS),
  });
}

function doOptions() {
  return jsonResponse_(true, "OK");
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    var parsed = parseRequestPayload_(e);
    if (!parsed.success) {
      Logger.log("doPost parse error: %s", parsed.error);
      return jsonResponse_(false, parsed.error);
    }

    var body = parsed.data;
    var validation = validatePayload_(body);
    if (!validation.success) {
      Logger.log("doPost validation: %s", validation.error);
      return jsonResponse_(false, validation.error);
    }

    var formType = validation.formType;
    var sheetTab = validation.sheetTab;
    var data = validation.data;
    var sourcePage = validation.sourcePage;
    var submittedAt = validation.submittedAt;
    var metadata = validation.metadata;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetTab) || ss.insertSheet(sheetTab);
    ensureSheetHeaders_(sheet, sheetTab);

    var row = prepareRowData_(formType, sheetTab, data, sourcePage, submittedAt, metadata);
    sheet.appendRow(row);

    Logger.log(
      "doPost success form_type=%s tab=%s page=%s",
      formType,
      sheetTab,
      sourcePage,
    );

    return jsonResponse_(true, "Submitted Successfully", {
      form_type: formType,
      sheet_tab: sheetTab,
      timestamp: submittedAt,
    });
  } catch (err) {
    var msg = err && err.message ? err.message : String(err);
    Logger.log("doPost error: %s", msg);
    return jsonResponse_(false, msg || "Server error");
  } finally {
    lock.releaseLock();
  }
}

/** Run manually once to create tabs and header rows. */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (var formType in SHEET_TABS) {
    if (!SHEET_TABS.hasOwnProperty(formType)) continue;
    var tab = SHEET_TABS[formType];
    var sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);
    ensureSheetHeaders_(sheet, tab);
  }
  Logger.log("setupSheets complete");
}

function parseRequestPayload_(e) {
  try {
    if (!e) {
      return { success: false, error: "Empty request." };
    }

    if (e.parameter && e.parameter.payload) {
      return { success: true, data: JSON.parse(String(e.parameter.payload)) };
    }

    if (e.postData && e.postData.contents) {
      var raw = e.postData.contents;
      var type = (e.postData.type || "").toLowerCase();

      if (type.indexOf("application/x-www-form-urlencoded") >= 0) {
        var decoded = parseUrlEncoded_(raw);
        if (decoded.payload) {
          return { success: true, data: JSON.parse(String(decoded.payload)) };
        }
      }

      if (type.indexOf("application/json") >= 0 || raw.charAt(0) === "{") {
        return { success: true, data: JSON.parse(raw) };
      }
    }

    return { success: false, error: "Missing payload." };
  } catch (parseErr) {
    return { success: false, error: "Invalid JSON payload." };
  }
}

function parseUrlEncoded_(raw) {
  var out = {};
  var pairs = String(raw).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var part = pairs[i].split("=");
    var key = decodeURIComponent(part[0] || "");
    var val = decodeURIComponent((part[1] || "").replace(/\+/g, " "));
    if (key) out[key] = val;
  }
  return out;
}

function validatePayload_(body) {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid payload." };
  }

  var formType = sanitizeString_(String(body.form_type || ""), MAX_FORM_TYPE_LENGTH);
  if (!formType) {
    return { success: false, error: "Missing form_type." };
  }

  var sheetTab = sanitizeString_(String(body.sheet_tab || ""), 99);
  if (!sheetTab) {
    sheetTab = SHEET_TABS[formType] || formType;
  }

  var data = body.data;
  if (!data || typeof data !== "object") {
    return { success: false, error: "Missing data object." };
  }

  var sourcePage = sanitizeString_(String(body.source_page || ""), 500);
  var submittedAt = sanitizeString_(
    String(body.submitted_at || new Date().toISOString()),
    40,
  );
  var metadata =
    body.metadata && typeof body.metadata === "object" ? body.metadata : {};

  return {
    success: true,
    formType: formType,
    sheetTab: sheetTab,
    data: data,
    sourcePage: sourcePage,
    submittedAt: submittedAt,
    metadata: metadata,
  };
}

function extractCommonFields_(data, sourcePage, metadata) {
  var name =
    data.name ||
    data.fullName ||
    data.full_name ||
    "";
  var phone = data.phone || "";
  var email = data.email || "";
  var city = data.city || "";
  var message =
    data.message ||
    data.issue ||
    data.notes ||
    "";
  var page =
    sourcePage ||
    (metadata && metadata.path ? String(metadata.path) : "") ||
    (metadata && metadata.page_url ? String(metadata.page_url) : "");
  var source =
    (metadata && metadata.referrer ? String(metadata.referrer) : "") ||
    data.leadSource ||
    data.source ||
    "";

  return {
    name: sanitizeString_(String(name), 200),
    phone: sanitizeString_(String(phone), 40),
    email: sanitizeString_(String(email), 200),
    city: sanitizeString_(String(city), 120),
    message: sanitizeString_(String(message), MAX_FIELD_LENGTH),
    page: sanitizeString_(String(page), 500),
    source: sanitizeString_(String(source), 500),
  };
}

function prepareRowData_(formType, sheetTab, data, sourcePage, submittedAt, metadata) {
  var common = extractCommonFields_(data, sourcePage, metadata);
  var timestamp = new Date().toISOString();
  var row = [
    timestamp,
    sanitizeString_(formType, MAX_FORM_TYPE_LENGTH),
    sanitizeString_(sourcePage, 500),
    submittedAt,
    common.name,
    common.phone,
    common.email,
    common.city,
    common.message,
    common.source,
  ];

  var headers = getDataHeaders_(sheetTab);
  for (var i = 0; i < headers.length; i++) {
    var key = headers[i];
    var val = data[key];
    row.push(val === undefined || val === null ? "" : sanitizeString_(String(val), MAX_FIELD_LENGTH));
  }
  return row;
}

function getDataHeaders_(sheetTab) {
  return SHEET_HEADERS[sheetTab] || [];
}

function ensureSheetHeaders_(sheet, sheetTab) {
  var dataHeaders = getDataHeaders_(sheetTab);
  var headers = STANDARD_HEADERS.concat(dataHeaders);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }
  var width = Math.max(sheet.getLastColumn(), headers.length);
  var existing = sheet.getRange(1, 1, 1, width).getValues()[0];
  var empty = true;
  for (var i = 0; i < existing.length; i++) {
    if (String(existing[i] || "").trim() !== "") {
      empty = false;
      break;
    }
  }
  if (sheet.getLastRow() === 1 && empty) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function sanitizeString_(value, maxLen) {
  var str = String(value || "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<\s*script\b/gi, "")
    .trim();
  if (str.length > maxLen) {
    return str.slice(0, maxLen);
  }
  return str;
}

function jsonResponse_(success, message, data) {
  var out = { success: success, message: message };
  if (data) out.data = data;
  if (!success) out.error = message;
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
