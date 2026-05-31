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
    label: "Trade-In Valuation",
    formType: FORM_TYPES.TRADE_IN,
    sheetTab: SHEET_TABS["trade-in"],
    sourcePage: "/sell",
    submitter: "submitTradeInForm",
  },
  {
    id: FORM_TYPES.NEWSLETTER,
    label: "Newsletter",
    formType: FORM_TYPES.NEWSLETTER,
    sheetTab: SHEET_TABS.newsletter,
    sourcePage: "/",
    submitter: "submitNewsletterForm",
  },
  {
    id: FORM_TYPES.SERVICE_REQUEST,
    label: "Service Request",
    formType: FORM_TYPES.SERVICE_REQUEST,
    sheetTab: SHEET_TABS["service-request"],
    sourcePage: "/support",
    submitter: "submitServiceRequestForm",
  },
  {
    id: FORM_TYPES.WARRANTY_REGISTRATION,
    label: "Warranty Registration",
    formType: FORM_TYPES.WARRANTY_REGISTRATION,
    sheetTab: SHEET_TABS["warranty-registration"],
    sourcePage: "/warranty",
    submitter: "submitWarrantyForm",
  },
];

export function getRegistryEntry(formType: string): FormRegistryEntry | undefined {
  return FORM_REGISTRY.find((e) => e.id === formType);
}
