/**
 * Google Apps Script — deploy as Web App (Execute as: Me, Access: Anyone).
 * Paste into Extensions → Apps Script on your Google Sheet, then deploy.
 * Set GOOGLE_SHEETS_WEBHOOK_URL in .env.local to the deployment URL.
 */
function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads") ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");

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

  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.leadType,
    data.referenceId,
    data.productName,
    data.productId,
    data.price,
    data.name,
    data.phone,
    data.city,
    data.contactPreference,
    data.message,
    data.preferredTime,
    data.leadSource,
    data.pageUrl,
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
