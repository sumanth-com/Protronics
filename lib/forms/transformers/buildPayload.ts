import type { FormType } from "@/lib/forms/constants/formTypes";
import { getSheetTab } from "@/lib/forms/constants/sheetTabs";
import type { StandardFormPayload } from "@/lib/forms/types";

export function buildStandardPayload(args: {
  formType: FormType;
  sourcePage: string;
  data: Record<string, string | number | boolean>;
  submittedAt?: string;
}): StandardFormPayload {
  return {
    form_type: args.formType,
    sheet_tab: getSheetTab(args.formType),
    source_page: args.sourcePage,
    submitted_at: args.submittedAt ?? new Date().toISOString(),
    data: args.data,
    metadata: { page_url: "", path: "", referrer: "" },
  };
}
