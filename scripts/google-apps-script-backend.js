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
 * 5. Optional: Project Settings → Script properties → add FORM_WEBHOOK_SECRET
 *    (same value as FORM_WEBHOOK_SECRET in Vercel / .env)
 * 6. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 7. Copy the Web app URL ending in /exec
 * 8. Put that URL in project `.env` as FORM_ENDPOINT_URL (server-only; not NEXT_PUBLIC)
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

var REQUIRED_FIELDS = {
  contact: ["fullName", "phone", "email", "city"],
  "product-lead": ["name", "phone", "productName", "leadType"],
  "trade-in": [
    "name",
    "phone",
    "city",
    "applianceType",
    "brand",
    "model",
    "age",
    "condition",
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
    version: "7.0",
    tabs: Object.keys(SHEET_COLUMNS),
    forms: Object.keys(SHEET_TABS),
    email: getNotifyConfig_().enabled ? "enabled" : "disabled",
    secret_required: Boolean(getWebhookSecret_()),
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

    var auth = authorizeRequest_(parsed.data);
    if (!auth.success) {
      Logger.log("doPost auth: %s", auth.error);
      return jsonResponse_(false, auth.error);
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
    var idempotencyKey = validation.idempotencyKey;

    if (idempotencyKey) {
      var cache = CacheService.getScriptCache();
      var cacheKey = "idem:" + idempotencyKey;
      if (cache.get(cacheKey)) {
        return jsonResponse_(true, "Submitted Successfully", {
          form_type: formType,
          sheet_tab: sheetTab,
          timestamp: submittedAt,
          duplicate: true,
        });
      }
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetTab) || ss.insertSheet(sheetTab);
    ensureSheetHeadersIfNeeded_(sheet, sheetTab);

    sheet.appendRow(prepareRowData_(sheetTab, data));

    if (idempotencyKey) {
      CacheService.getScriptCache().put("idem:" + idempotencyKey, "1", 600);
    }

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
    forceSheetHeaders_(sheet, tab);
  }
  Logger.log(
    "setupSheets complete — Contact, Leads, TradeIn (duplicate columns cleared)",
  );
}

function setupEmailNotifications() {
  var props = PropertiesService.getScriptProperties();
  var existing = String(props.getProperty("NOTIFICATION_EMAIL") || "").trim();
  var updates = {
    NOTIFY_ENABLED: "true",
    NOTIFY_FROM_NAME: "Protronics Forms",
  };
  if (!existing) {
    // Prefer setting NOTIFICATION_EMAIL manually in Script properties.
    updates.NOTIFICATION_EMAIL = "";
  }
  props.setProperties(updates, false);
  Logger.log(
    "Email notifications configured (enabled=%s). Set NOTIFICATION_EMAIL in Script properties if empty.",
    props.getProperty("NOTIFY_ENABLED"),
  );
}

function testEmailNotification() {
  var cfg = getNotifyConfig_();
  if (!cfg.to) {
    throw new Error("NOTIFICATION_EMAIL is empty. Set it in Script properties first.");
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

function getWebhookSecret_() {
  return String(
    PropertiesService.getScriptProperties().getProperty("FORM_WEBHOOK_SECRET") || "",
  ).trim();
}

function authorizeRequest_(body) {
  var expected = getWebhookSecret_();
  if (!expected) {
    // Secret optional until configured; Next.js proxy still provides validation.
    return { success: true };
  }
  var provided = String((body && body.webhook_secret) || "").trim();
  if (!provided || provided !== expected) {
    return { success: false, error: "Unauthorized." };
  }
  return { success: true };
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

  var required = REQUIRED_FIELDS[formType] || [];
  for (var r = 0; r < required.length; r++) {
    var field = required[r];
    var value = data[field];
    if (value === undefined || value === null || String(value).trim() === "") {
      return { success: false, error: "Missing required field: " + field };
    }
  }

  var phone = String(data.phone || "").replace(/\D/g, "");
  if (phone.length !== 10) {
    return { success: false, error: "Invalid phone number." };
  }
  data.phone = phone;

  if (formType === "contact") {
    var email = String(data.email || "").trim();
    if (!email || email.indexOf("@") < 1) {
      return { success: false, error: "Invalid email address." };
    }
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
    idempotencyKey: sanitizeString_(String(body.idempotency_key || ""), 80),
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

function headersMatch_(sheet, sheetTab) {
  var expected = getHeaderRow_(sheetTab);
  if (sheet.getLastRow() === 0) return false;
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var current = sheet.getRange(1, 1, 1, lastCol).getValues()[0] || [];
  if (current.length < expected.length) return false;
  for (var i = 0; i < expected.length; i++) {
    if (String(current[i] || "") !== expected[i]) return false;
  }
  return true;
}

/** Only rewrite headers when missing/mismatched — never on every append. */
function ensureSheetHeadersIfNeeded_(sheet, sheetTab) {
  if (headersMatch_(sheet, sheetTab)) {
    sheet.setFrozenRows(1);
    return;
  }
  forceSheetHeaders_(sheet, sheetTab);
}

function forceSheetHeaders_(sheet, sheetTab) {
  var headers = getHeaderRow_(sheetTab);
  var needed = headers.length;

  var lastCol = Math.max(sheet.getLastColumn(), needed);
  if (lastCol > 0) {
    sheet.getRange(1, 1, 1, lastCol).clearContent();
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    sheet.getRange(1, 1, 1, needed).setValues([headers]);
  }

  var maxCols = sheet.getMaxColumns();
  if (maxCols > needed) {
    sheet.deleteColumns(needed + 1, maxCols - needed);
  }

  sheet.setFrozenRows(1);
}

function sanitizeString_(value, maxLen) {
  var str = String(value || "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/\bon\w+\s*=/gi, "")
    .replace(/javascript\s*:/gi, "")
    .trim();

  // Spreadsheet formula injection
  var first = str.charAt(0);
  if (
    first === "=" ||
    first === "+" ||
    first === "-" ||
    first === "@" ||
    first === "\t" ||
    first === "\r"
  ) {
    str = "'" + str;
  }

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
