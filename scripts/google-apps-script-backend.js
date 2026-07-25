/**
 * @deprecated Prefer scripts/Code.gs (same backend + email notifications).
 * Keep this file as an alias: copy scripts/Code.gs into Apps Script.
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
 * SHEETS (3 tabs — columns match website forms only)
 *   contact      → Contact
 *   product-lead → Leads
 *   trade-in     → TradeIn
 *
 * EMAIL ALERTS — edit setupEmailNotifications() or Script properties:
 *   NOTIFICATION_EMAIL, NOTIFY_ENABLED, NOTIFY_FROM_NAME
 */

/** form_type → sheet tab */
var SHEET_TABS = {
  contact: "Contact",
  "product-lead": "Leads",
  "trade-in": "TradeIn",
};

/**
 * Columns per tab: [header label, data key]
 * Timestamp is always first (auto). Only form fields after that.
 */
var SHEET_COLUMNS = {
  Contact: [
    ["Full Name", "fullName"],
    ["Phone", "phone"],
    ["Email", "email"],
    ["City", "city"],
    ["Product", "product"],
    ["Message", "message"],
  ],
  Leads: [
    ["Lead Type", "leadType"],
    ["Name", "name"],
    ["Phone", "phone"],
    ["City", "city"],
    ["Contact Preference", "contactPreference"],
    ["Preferred Time", "preferredTime"],
    ["Message", "message"],
    ["Product Name", "productName"],
    ["Price", "price"],
    ["Reference ID", "referenceId"],
  ],
  TradeIn: [
    ["Name", "name"],
    ["Phone", "phone"],
    ["City", "city"],
    ["Appliance Type", "applianceType"],
    ["Brand", "brand"],
    ["Model", "model"],
    ["Age", "age"],
    ["Condition", "condition"],
    ["Description", "description"],
    ["Reference ID", "referenceId"],
  ],
};

var MAX_FIELD_LENGTH = 5000;
var MAX_FORM_TYPE_LENGTH = 64;

var FORM_LABELS = {
  contact: "Contact enquiry",
  "product-lead": "Product lead / reserve",
  "trade-in": "Trade-in / sell",
};

function doGet() {
  return jsonResponse_(true, "Form webhook healthy", {
    version: "6.1",
    tabs: Object.keys(SHEET_COLUMNS),
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

    var validation = validatePayload_(parsed.data);
    if (!validation.success) {
      Logger.log("doPost validation: %s", validation.error);
      return jsonResponse_(false, validation.error);
    }

    var formType = validation.formType;
    var sheetTab = validation.sheetTab;
    var data = validation.data;
    var sourcePage = validation.sourcePage;
    var submittedAt = validation.submittedAt;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetTab) || ss.insertSheet(sheetTab);
    ensureSheetHeaders_(sheet, sheetTab);

    sheet.appendRow(prepareRowData_(sheetTab, data));

    try {
      sendNotificationEmail_(formType, sheetTab, data, sourcePage, submittedAt);
    } catch (mailErr) {
      Logger.log(
        "Email notify failed (row still saved): %s",
        mailErr && mailErr.message ? mailErr.message : mailErr,
      );
    }

    Logger.log("doPost success form_type=%s tab=%s", formType, sheetTab);

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

/** Run once — creates Contact, Leads, TradeIn + header rows. */
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var seen = {};
  for (var formType in SHEET_TABS) {
    if (!SHEET_TABS.hasOwnProperty(formType)) continue;
    var tab = SHEET_TABS[formType];
    if (seen[tab]) continue;
    seen[tab] = true;
    var sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);
    ensureSheetHeaders_(sheet, tab);
  }
  Logger.log("setupSheets complete — Contact, Leads, TradeIn");
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
    "Email notifications → %s (enabled=%s)",
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
    body: "This is a test from the Protronics form backend.\n",
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

function sendNotificationEmail_(formType, sheetTab, data, sourcePage, submittedAt) {
  var cfg = getNotifyConfig_();
  if (!cfg.enabled || !cfg.to) return;

  var label = FORM_LABELS[formType] || formType;
  var columns = SHEET_COLUMNS[sheetTab] || [];
  var lines = [];
  lines.push("New " + label);
  lines.push("Tab: " + sheetTab);
  lines.push("Submitted: " + submittedAt);
  if (sourcePage) lines.push("Page: " + sourcePage);
  lines.push("");

  for (var i = 0; i < columns.length; i++) {
    var header = columns[i][0];
    var key = columns[i][1];
    var val = data[key];
    if (val === undefined || val === null || String(val).trim() === "") continue;
    lines.push(header + ": " + String(val));
  }

  MailApp.sendEmail({
    to: cfg.to,
    name: cfg.fromName,
    subject: "[Protronics] New " + label,
    body: lines.join("\n"),
  });
}

function parseRequestPayload_(e) {
  try {
    if (!e) return { success: false, error: "Empty request." };

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
  if (!formType) return { success: false, error: "Missing form_type." };
  if (!SHEET_TABS[formType]) {
    return { success: false, error: "Unknown form_type: " + formType };
  }

  var data = body.data;
  if (!data || typeof data !== "object") {
    return { success: false, error: "Missing data object." };
  }

  return {
    success: true,
    formType: formType,
    sheetTab: SHEET_TABS[formType],
    data: data,
    sourcePage: sanitizeString_(String(body.source_page || ""), 500),
    submittedAt: sanitizeString_(
      String(body.submitted_at || new Date().toISOString()),
      40,
    ),
  };
}

function prepareRowData_(sheetTab, data) {
  var columns = SHEET_COLUMNS[sheetTab] || [];
  var row = [new Date().toISOString()];
  for (var i = 0; i < columns.length; i++) {
    var key = columns[i][1];
    var val = data[key];
    row.push(
      val === undefined || val === null
        ? ""
        : sanitizeString_(String(val), MAX_FIELD_LENGTH),
    );
  }
  return row;
}

function getHeaderRow_(sheetTab) {
  var columns = SHEET_COLUMNS[sheetTab] || [];
  var headers = ["Timestamp"];
  for (var i = 0; i < columns.length; i++) {
    headers.push(columns[i][0]);
  }
  return headers;
}

function ensureSheetHeaders_(sheet, sheetTab) {
  var headers = getHeaderRow_(sheetTab);
  var needed = headers.length;

  // Wipe old/duplicate header cells so only form columns remain
  var lastCol = Math.max(sheet.getLastColumn(), needed);
  if (lastCol > 0) {
    sheet.getRange(1, 1, 1, lastCol).clearContent();
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    sheet.getRange(1, 1, 1, needed).setValues([headers]);
  }

  // Drop leftover empty columns past the form schema (keeps sheet clean)
  var maxCols = sheet.getMaxColumns();
  if (maxCols > needed) {
    sheet.deleteColumns(needed + 1, maxCols - needed);
  }

  sheet.setFrozenRows(1);
}

function sanitizeString_(value, maxLen) {
  var str = String(value || "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<\s*script\b/gi, "")
    .trim();
  if (str.length > maxLen) return str.slice(0, maxLen);
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
