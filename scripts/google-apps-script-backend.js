/**
 * Protronics — Google Apps Script backend (copy entire file into Apps Script editor)
 *
 * Deploy: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy /exec URL → VITE_FORM_ENDPOINT_URL / NEXT_PUBLIC_FORM_ENDPOINT_URL
 *
 * Run setupSheets() once from the editor before first live submission.
 */

var SHEET_TABS = {
  contact: "Contact",
  "product-lead": "Leads",
  "trade-in": "TradeIn",
  newsletter: "Newsletter",
  "service-request": "ServiceRequests",
  "warranty-registration": "Warranty",
};

/** Column headers per tab (after standard columns). */
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

var STANDARD_HEADERS = ["Timestamp", "Form Type", "Source Page", "Submitted At"];

function doGet() {
  return jsonResponse_(true, "Form webhook healthy", {
    version: "2.0",
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
    var payload = parseRequestPayload_(e);
    if (!payload.success) {
      return jsonResponse_(false, payload.error);
    }
    var body = payload.data;

    var formType = String(body.form_type || "").trim();
    var sheetTab = String(body.sheet_tab || "").trim();
    var data = body.data;
    var sourcePage = String(body.source_page || "");
    var submittedAt = String(body.submitted_at || new Date().toISOString());

    if (!formType) {
      return jsonResponse_(false, "Missing form_type.");
    }
    if (!sheetTab) {
      sheetTab = SHEET_TABS[formType] || formType;
    }
    if (!data || typeof data !== "object") {
      return jsonResponse_(false, "Missing data object.");
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetTab) || ss.insertSheet(sheetTab);
    var row = prepareRowData_(formType, sheetTab, data, sourcePage, submittedAt);
    ensureSheetHeaders_(sheet, sheetTab);
    sheet.appendRow(row);

    return jsonResponse_(true, "Submitted Successfully", {
      form_type: formType,
      sheet_tab: sheetTab,
      timestamp: submittedAt,
    });
  } catch (err) {
    Logger.log("doPost error: %s", err && err.message ? err.message : err);
    return jsonResponse_(false, err && err.message ? err.message : "Server error");
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

function prepareRowData_(formType, sheetTab, data, sourcePage, submittedAt) {
  var headers = getDataHeaders_(sheetTab);
  var row = [new Date().toISOString(), formType, sourcePage, submittedAt];
  for (var i = 0; i < headers.length; i++) {
    var key = headers[i];
    var val = data[key];
    row.push(val === undefined || val === null ? "" : val);
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

function jsonResponse_(success, message, data) {
  var out = { success: success, message: message };
  if (data) out.data = data;
  if (!success) out.error = message;
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
