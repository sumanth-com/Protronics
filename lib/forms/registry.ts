import { FORM_TYPES } from "@/lib/forms/constants/formTypes";
import { SHEET_TABS } from "@/lib/forms/constants/sheetTabs";
import type { FormRegistryEntry } from "@/lib/forms/types";

/**
 * Central registry — add new forms here (step 3 of “Add new form” checklist).
 */
export const FORM_REGISTRY: FormRegistryEntry[] = [
  {
    id: FORM_TYPES.CONTACT,
    label: "Contact Form",
    formType: FORM_TYPES.CONTACT,
    sheetTab: SHEET_TABS.contact,
    sourcePage: "/contact",
    submitter: "submitContactForm",
  },
  {
    id: FORM_TYPES.PRODUCT_LEAD,
    label: "Product Inquiry / Reserve / Callback",
    formType: FORM_TYPES.PRODUCT_LEAD,
    sheetTab: SHEET_TABS["product-lead"],
    sourcePage: "/shop",
    submitter: "submitProductLeadForm",
  },
  {
    id: FORM_TYPES.TRADE_IN,
    label: "Sell / Valuation Form",
    formType: FORM_TYPES.TRADE_IN,
    sheetTab: SHEET_TABS["trade-in"],
    sourcePage: "/sell",
    submitter: "submitTradeInForm",
  },
];

export function getRegistryEntry(formType: string): FormRegistryEntry | undefined {
  return FORM_REGISTRY.find((e) => e.id === formType);
}
