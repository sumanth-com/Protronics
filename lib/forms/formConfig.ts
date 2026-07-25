/**
 * Central form configuration — registry, types, sheet tabs.
 * Add new forms here first, then validators/transformers/submitters.
 */
import { FORM_TYPES, type FormType } from "@/lib/forms/constants/formTypes";
import { SHEET_TABS, getSheetTab } from "@/lib/forms/constants/sheetTabs";
import { FORM_REGISTRY, getRegistryEntry } from "@/lib/forms/registry";

export const FORM_CONFIG = {
  types: FORM_TYPES,
  tabs: SHEET_TABS,
  registry: FORM_REGISTRY,
  getTab: getSheetTab,
  getEntry: getRegistryEntry,
} as const;

export { FORM_TYPES, type FormType };
export { SHEET_TABS, getSheetTab };
export { FORM_REGISTRY, getRegistryEntry };
