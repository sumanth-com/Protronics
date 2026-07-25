import type { FormType } from "@/lib/forms/constants/formTypes";

/**
 * form_type → Google Spreadsheet tab (3 tabs only).
 *   contact      → Contact
 *   product-lead → Leads
 *   trade-in     → TradeIn
 */
export const SHEET_TABS: Record<FormType, string> = {
  contact: "Contact",
  "product-lead": "Leads",
  "trade-in": "TradeIn",
};

export function getSheetTab(formType: FormType): string {
  return SHEET_TABS[formType];
}
