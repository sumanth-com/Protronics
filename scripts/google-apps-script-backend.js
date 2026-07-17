/**
 * @deprecated Prefer scripts/Code.gs (same backend + email notifications).
 * Keep this file as an alias: copy scripts/Code.gs into Apps Script.
 *
 * Deploy: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy /exec URL → NEXT_PUBLIC_FORM_ENDPOINT in .env
 *
 * Run setupSheets() then setupEmailNotifications() once from the editor.
 *
 * --- BEGIN: paste scripts/Code.gs below (kept in sync with Code.gs) ---
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Protronics — Google Apps Script (paste this entire file into Code.gs)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * SETUP (one-time)
 * 1. Open your Google Spreadsheet → Extensions → Apps Script
 * 2. Delete any default code → paste THIS entire file → Save
 * 3. Select setupSheets → Run (authorize when prompted)
 * 4. Select setupEmailNotifications → Run (sets who gets email alerts)
 * 5. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 6. Copy the Web app URL ending in /exec
 * 7. Put that URL in project `.env` as NEXT_PUBLIC_FORM_ENDPOINT
 *
 * EMAIL ALERTS
 * - Default recipient is set in setupEmailNotifications() below — edit before running.
 * - Or: Project Settings → Script properties:
 *     NOTIFICATION_EMAIL = you@email.com,team@email.com
 *     NOTIFY_ENABLED     = true
 *     NOTIFY_FROM_NAME   = Protronics Forms
 *
 * Endpoint env vars (Next.js):
 *   NEXT_PUBLIC_FORM_ENDPOINT
 *   NEXT_PUBLIC_FORM_ENDPOINT_URL   (alias)
 */

var SHEET_TABS = {
  contact: "Contact",
  "product-lead": "Leads",
  "trade-in": "TradeIn",
  newsletter: "Newsletter",
  "service-request": "ServiceRequests",
  "warranty-registration": "Warranty",
};

/** Universal columns on every tab. */
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

/** Extra columns per tab (after STANDARD_HEADERS). */
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

/** Friendly labels for email subjects. */
var FORM_LABELS = {
  contact: "Contact enquiry",
  "product-lead": "Product lead / reserve",
  "trade-in": "Trade-in / sell",
  newsletter: "Newsletter signup",
  "service-request": "Service request",
  "warranty-registration": "Warranty registration",
};

function doGet() {
  return jsonResponse_(true, "Form webhook healthy", {
    version: "3.1",
    forms: Object.keys(SHEET_TABS),
    email: getNotifyConfig_().enabled ? "enabled" : "disabled",
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

    try {
      sendNotificationEmail_(formType, sheetTab, data, sourcePage, submittedAt, metadata);
    } catch (mailErr) {
      Logger.log(
        "Email notify failed (row still saved): %s",
        mailErr && mailErr.message ? mailErr.message : mailErr,
      );
    }

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

function setupEmailNotifications() {
  var props = PropertiesService.getScriptProperties();
  props.setProperties(
    {
      NOTIFICATION_EMAIL: "Protronicspro4@gmail.com",
      NOTIFY_ENABLED: "true",
      NOTIFY_FROM_NAME: "Protronics Forms",
    },
    true,
  );
  Logger.log(
    "Email notifications configured → %s (enabled=%s)",
    props.getProperty("NOTIFICATION_EMAIL"),
    props.getProperty("NOTIFY_ENABLED"),
  );
}

function testEmailNotification() {
  var cfg = getNotifyConfig_();
  if (!cfg.to) {
    throw new Error("NOTIFICATION_EMAIL is empty. Run setupEmailNotifications() first.");
  }
  MailApp.sendEmail({
    to: cfg.to,
    name: cfg.fromName,
    subject: "[Protronics] Test email notification",
    body:
      "This is a test from the Protronics Google Apps Script form backend.\n\n" +
      "If you received this, email alerts are working.\n",
  });
  Logger.log("Test email sent to %s", cfg.to);
}

function getNotifyConfig_() {
  var props = PropertiesService.getScriptProperties();
  var enabledRaw = String(props.getProperty("NOTIFY_ENABLED") || "true").toLowerCase();
  var enabled = !(enabledRaw === "false" || enabledRaw === "0" || enabledRaw === "no");
  return {
    enabled: enabled,
    to: String(props.getProperty("NOTIFICATION_EMAIL") || "").trim(),
    fromName: String(props.getProperty("NOTIFY_FROM_NAME") || "Protronics Forms").trim(),
  };
}

function sendNotificationEmail_(formType, sheetTab, data, sourcePage, submittedAt, metadata) {
  var cfg = getNotifyConfig_();
  if (!cfg.enabled) {
    Logger.log("Notify disabled — skip email");
    return;
  }
  if (!cfg.to) {
    Logger.log("NOTIFICATION_EMAIL empty — skip email");
    return;
  }

  var common = extractCommonFields_(data, sourcePage, metadata);
  var label = FORM_LABELS[formType] || formType;
  var subject = "[Protronics] New " + label;

  var lines = [];
  lines.push("New form submission on Protronics");
  lines.push("");
  lines.push("Type:        " + label + " (" + formType + ")");
  lines.push("Sheet tab:   " + sheetTab);
  lines.push("Submitted:   " + submittedAt);
  lines.push("Source page: " + (sourcePage || "(none)"));
  lines.push("");
  lines.push("--- Contact ---");
  lines.push("Name:    " + (common.name || "—"));
  lines.push("Phone:   " + (common.phone || "—"));
  lines.push("Email:   " + (common.email || "—"));
  lines.push("City:    " + (common.city || "—"));
  lines.push("Message: " + (common.message || "—"));
  lines.push("Source:  " + (common.source || "—"));
  lines.push("");
  lines.push("--- Form fields ---");

  var keys = Object.keys(data);
  keys.sort();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = data[key];
    if (val === undefined || val === null || String(val).trim() === "") continue;
    lines.push(key + ": " + String(val));
  }

  lines.push("");
  lines.push("Open your Protronics leads spreadsheet to view / reply.");

  MailApp.sendEmail({
    to: cfg.to,
    name: cfg.fromName,
    subject: subject,
    body: lines.join("\n"),
  });
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
  var name = data.name || data.fullName || data.full_name || "";
  var phone = data.phone || "";
  var email = data.email || "";
  var city = data.city || "";
  var message = data.message || data.issue || data.notes || "";
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
    row.push(
      val === undefined || val === null
        ? ""
        : sanitizeString_(String(val), MAX_FIELD_LENGTH),
    );
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
