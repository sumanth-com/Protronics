import { createFormSubmitter } from "@/lib/forms/createFormSubmitter";
import { transformTradeIn } from "@/lib/forms/transformers/tradeInTransformer";
import type { TradeInFormValues } from "@/lib/forms/validators/tradeInValidator";
import { validateTradeIn } from "@/lib/forms/validators/tradeInValidator";

export const submitTradeInForm = createFormSubmitter<TradeInFormValues>({
  validate: validateTradeIn,
  transform: transformTradeIn,
  defaultSourcePage: "/trade-in",
});
