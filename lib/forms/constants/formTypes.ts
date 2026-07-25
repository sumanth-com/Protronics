/** Canonical form_type values — must match Apps Script SHEET_TABS keys. */
export const FORM_TYPES = {
  CONTACT: "contact",
  PRODUCT_LEAD: "product-lead",
  TRADE_IN: "trade-in",
} as const;

export type FormType = (typeof FORM_TYPES)[keyof typeof FORM_TYPES];
