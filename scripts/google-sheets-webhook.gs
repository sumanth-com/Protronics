/**
 * Google Apps Script — deploy as Web App (Execute as: Me, Access: Anyone).
 * Paste into Extensions → Apps Script on your Google Sheet, then deploy.
 * Set GOOGLE_SHEETS_WEBHOOK_URL in .env.local to the deployment URL.
 */
function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const sheetName = payload.sheet === "TradeIn" ? "TradeIn" : "Leads";
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName) ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);

  if (sheetName === "TradeIn") {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead Type",
        "Reference ID",
        "Name",
        "Phone",
        "City",
        "Appliance Type",
        "Brand",
        "Model",
        "Age",
        "Condition",
        "Expected Price",
        "Estimated Low",
        "Estimated High",
        "Image Count",
        "Image Names",
        "Lead Source",
        "Page URL",
      ]);
    }

    sheet.appendRow([
      payload.timestamp,
      payload.leadType,
      payload.referenceId,
      payload.name,
      payload.phone,
      payload.city,
      payload.applianceType,
      payload.brand,
      payload.model,
      payload.age,
      payload.condition,
      payload.expectedPrice,
      payload.estimatedLow,
      payload.estimatedHigh,
      payload.imageCount,
      payload.imageNames,
      payload.leadSource,
      payload.pageUrl,
    ]);
  } else {
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead Type",
        "Reference ID",
        "Product Name",
        "Product ID",
        "Price",
        "Name",
        "Phone",
        "City",
        "Contact Preference",
        "Message",
        "Preferred Time",
        "Lead Source",
        "Page URL",
      ]);
    }

    sheet.appendRow([
      payload.timestamp,
      payload.leadType,
      payload.referenceId,
      payload.productName,
      payload.productId,
      payload.price,
      payload.name,
      payload.phone,
      payload.city,
      payload.contactPreference,
      payload.message,
      payload.preferredTime,
      payload.leadSource,
      payload.pageUrl,
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
