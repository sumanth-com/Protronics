/**
 * Central form configuration — registry, types, sheet tabs, and shared field keys.
 * Add new forms here first, then validators/transformers/submitters.
 */
import { FORM_TYPES, type FormType } from "@/lib/forms/constants/formTypes";
import { SHEET_TABS, getSheetTab } from "@/lib/forms/constants/sheetTabs";
import { FORM_REGISTRY, getRegistryEntry } from "@/lib/forms/registry";

/** Canonical column keys stored on every sheet (Apps Script STANDARD_HEADERS). */
export const FORM_STORE_FIELDS = {
  timestamp: "timestamp",
  formType: "formType",
  name: "name",
  phone: "phone",
  email: "email",
  city: "city",
  message: "message",
  page: "page",
  source: "source",
} as const;

export type FormStoreField = (typeof FORM_STORE_FIELDS)[keyof typeof FORM_STORE_FIELDS];

export const FORM_CONFIG = {
  types: FORM_TYPES,
  tabs: SHEET_TABS,
  registry: FORM_REGISTRY,
  storeFields: FORM_STORE_FIELDS,
  getTab: getSheetTab,
  getEntry: getRegistryEntry,
} as const;

export { FORM_TYPES, type FormType };
export { SHEET_TABS, getSheetTab };
export { FORM_REGISTRY, getRegistryEntry };
