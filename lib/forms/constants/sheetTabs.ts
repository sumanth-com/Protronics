import type { FormType } from "@/lib/forms/constants/formTypes";

/** form_type → Google Spreadsheet tab name */
/** Leads tab includes referenceId in data columns via Apps Script SHEET_HEADERS */
export const SHEET_TABS: Record<FormType, string> = {
  contact: "Contact",
  "product-lead": "Leads",
  "trade-in": "TradeIn",
  newsletter: "Newsletter",
  "service-request": "ServiceRequests",
  "warranty-registration": "Warranty",
};

export function getSheetTab(formType: FormType): string {
  return SHEET_TABS[formType];
}
