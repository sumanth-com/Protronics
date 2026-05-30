"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronRight, ImagePlus, Loader2, X } from "lucide-react";
import FormAlert from "@/components/forms/FormAlert";
import CtaButton from "@/components/ui/CtaButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import TradeInSectionHeader, {
  TradeInReveal,
} from "@/components/trade-in/TradeInSectionHeader";
import { useTradeInListMotion } from "@/components/trade-in/useTradeInListMotion";
import { submitTradeInLead } from "@/lib/trade-in-leads";
import {
  ACCEPTED_BRANDS,
  AGE_OPTIONS,
  APPLIANCE_CATEGORIES,
  CONDITION_OPTIONS,
  TRADE_IN_LINKS,
  WORKING_STATUS_OPTIONS,
  estimateTradeInValue,
  formatInrRange,
  tradeInGlass,
  type AgeOption,
  type ApplianceTypeId,
  type ConditionOption,
  type WorkingStatusOption,
} from "@/lib/trade-in";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  applianceType: ApplianceTypeId;
  brand: string;
  model: string;
  age: AgeOption;
  condition: ConditionOption;
  workingStatus: WorkingStatusOption;
  description: string;
  expectedPrice: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  applianceType: "refrigerator",
  brand: ACCEPTED_BRANDS[0],
  model: "",
  age: AGE_OPTIONS[1],
  condition: "Good",
  workingStatus: WORKING_STATUS_OPTIONS[0],
  description: "",
  expectedPrice: "",
};

const inputClass = (hasError: boolean) =>
  cn(
    "trade-in-field w-full min-h-[48px] rounded-xl border bg-white/[0.04] px-4 py-3 text-[14px] text-white",
    "placeholder:text-white/35 outline-none transition-[border-color,box-shadow]",
    hasError
      ? "border-red-400/50 focus:border-red-400/60 focus:ring-2 focus:ring-red-400/15"
      : "border-white/12 focus:border-white/40 focus:ring-2 focus:ring-white/15",
  );

function validateStep1(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[\d\s+\-()]{8,16}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!values.city.trim()) errors.city = "City is required.";
  return errors;
}

function validateStep2(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.model.trim()) errors.model = "Model name is required.";
  return errors;
}

export default function TradeInForm() {
  const listMotion = useTradeInListMotion();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const estimate = useMemo(
    () =>
      estimateTradeInValue({
        applianceType: values.applianceType,
        brand: values.brand,
        age: values.age,
        condition: values.condition,
        workingStatus: values.workingStatus,
      }),
    [values],
  );

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 6));
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const goNext = () => {
    const nextErrors = validateStep1(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = { ...validateStep1(values), ...validateStep2(values) };
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name || nextErrors.phone || nextErrors.city) setStep(1);
      return;
    }

    setStatus("loading");
    setSubmitError("");
    try {
      const res = await submitTradeInLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        applianceType:
          APPLIANCE_CATEGORIES.find((c) => c.id === values.applianceType)?.label ??
          values.applianceType,
        brand: values.brand,
        model: values.model.trim(),
        age: values.age,
        condition: values.condition,
        workingStatus: values.workingStatus,
        description: values.description.trim(),
        expectedPrice: values.expectedPrice.trim(),
        imageCount: files.length,
        imageNames: files.map((f) => f.name).join(", "),
        estimatedLow: estimate?.low,
        estimatedHigh: estimate?.high,
        pageUrl: typeof window !== "undefined" ? window.location.href : "/trade-in",
        leadSource: "Trade-In Form",
      });
      setReferenceId(res.referenceId);
      setStatus("success");
      setValues(initial);
      setFiles([]);
      setStep(1);
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit. Please try again.",
      );
    }
  };

  return (
    <section id="trade-in-form" className="relative bg-black py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <TradeInReveal>
          <TradeInSectionHeader
            eyebrow="REQUEST VALUATION"
            title="Complete Your Trade-In Details"
            description="Submit once—we'll contact you with a detailed valuation. Connects to our team via Google Sheets."
            align="center"
          />
        </TradeInReveal>

        <motion.div
          variants={listMotion.parent}
          initial="hidden"
          whileInView="show"
          viewport={listMotion.viewport}
          className="mt-8 sm:mt-10"
        >
          <motion.div variants={listMotion.child} className={cn("mx-auto max-w-3xl p-5 sm:p-8", tradeInGlass)}>
            <div className="mb-6 flex gap-2" aria-label="Form progress">
              {([1, 2] as const).map((n) => (
                <div
                  key={n}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    step >= n ? "bg-theme-accent" : "bg-white/15",
                  )}
                />
              ))}
            </div>
            <p className="mb-5 text-center text-[12px] font-medium text-white/50">
              Step {step} of 2 — {step === 1 ? "Your details" : "Appliance & photos"}
            </p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 text-center sm:py-8"
                >
                  <CheckCircle2 className="mx-auto h-12 w-12 text-white" />
                  <h3 className="mt-4 text-[22px] font-semibold text-white">
                    Trade-In Request Received
                  </h3>
                  <p className="mt-2 text-[14px] text-white/65">
                    Reference:{" "}
                    <span className="font-semibold text-white">{referenceId}</span>
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-white/55">
                    We&apos;ll contact you with a detailed valuation. Share more photos on
                    WhatsApp for a faster final offer.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <CtaButton href={TRADE_IN_LINKS.shop}>Browse Upgrades</CtaButton>
                    <a
                      href={TRADE_IN_LINKS.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[13px] font-semibold text-white hover:border-white/30"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} className="space-y-5">
                  {submitError ? <FormAlert variant="error" message={submitError} /> : null}

                  {step === 1 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-[12px] font-medium text-white/55">
                          Name *
                        </span>
                        <input
                          value={values.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={inputClass(!!errors.name)}
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                        {errors.name ? (
                          <p className="mt-1 text-[12px] text-red-400">{errors.name}</p>
                        ) : null}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-[12px] font-medium text-white/55">
                          Phone *
                        </span>
                        <input
                          value={values.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputClass(!!errors.phone)}
                          placeholder="+91 90000 00000"
                          type="tel"
                          autoComplete="tel"
                        />
                        {errors.phone ? (
                          <p className="mt-1 text-[12px] text-red-400">{errors.phone}</p>
                        ) : null}
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-[12px] font-medium text-white/55">
                          Email
                        </span>
                        <input
                          value={values.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputClass(false)}
                          placeholder="you@email.com"
                          type="email"
                          autoComplete="email"
                        />
                      </label>

                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-[12px] font-medium text-white/55">
                          City *
                        </span>
                        <input
                          value={values.city}
                          onChange={(e) => update("city", e.target.value)}
                          className={inputClass(!!errors.city)}
                          placeholder="Bengaluru"
                        />
                        {errors.city ? (
                          <p className="mt-1 text-[12px] text-red-400">{errors.city}</p>
                        ) : null}
                      </label>

                      <div className="sm:col-span-2">
                        <CtaButton type="button" fullWidth size="lg" onClick={goNext}>
                          Continue
                          <ChevronRight className="h-4 w-4" />
                        </CtaButton>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Appliance Category *
                          </span>
                          <select
                            value={values.applianceType}
                            onChange={(e) =>
                              update("applianceType", e.target.value as ApplianceTypeId)
                            }
                            className={inputClass(false)}
                          >
                            {APPLIANCE_CATEGORIES.map((c) => (
                              <option key={c.id} value={c.id} className="bg-black">
                                {c.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Brand *
                          </span>
                          <select
                            value={values.brand}
                            onChange={(e) => update("brand", e.target.value)}
                            className={inputClass(false)}
                          >
                            {ACCEPTED_BRANDS.map((b) => (
                              <option key={b} value={b} className="bg-black">
                                {b}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Model *
                          </span>
                          <input
                            value={values.model}
                            onChange={(e) => update("model", e.target.value)}
                            className={inputClass(!!errors.model)}
                            placeholder="e.g. LG GL-D322ABNX"
                          />
                          {errors.model ? (
                            <p className="mt-1 text-[12px] text-red-400">{errors.model}</p>
                          ) : null}
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Age *
                          </span>
                          <select
                            value={values.age}
                            onChange={(e) => update("age", e.target.value as AgeOption)}
                            className={inputClass(false)}
                          >
                            {AGE_OPTIONS.map((a) => (
                              <option key={a} value={a} className="bg-black">
                                {a}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Condition *
                          </span>
                          <select
                            value={values.condition}
                            onChange={(e) =>
                              update("condition", e.target.value as ConditionOption)
                            }
                            className={inputClass(false)}
                          >
                            {CONDITION_OPTIONS.map((c) => (
                              <option key={c} value={c} className="bg-black">
                                {c}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Working Status *
                          </span>
                          <select
                            value={values.workingStatus}
                            onChange={(e) =>
                              update("workingStatus", e.target.value as WorkingStatusOption)
                            }
                            className={inputClass(false)}
                          >
                            {WORKING_STATUS_OPTIONS.map((w) => (
                              <option key={w} value={w} className="bg-black">
                                {w}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Description
                          </span>
                          <textarea
                            value={values.description}
                            onChange={(e) => update("description", e.target.value)}
                            className={cn(inputClass(false), "min-h-[88px] resize-y")}
                            placeholder="Any issues, dents, or notes for our evaluator…"
                            rows={3}
                          />
                        </label>

                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-[12px] font-medium text-white/55">
                            Expected Value (optional)
                          </span>
                          <input
                            value={values.expectedPrice}
                            onChange={(e) => update("expectedPrice", e.target.value)}
                            className={inputClass(false)}
                            placeholder="₹12,000"
                          />
                        </label>
                      </div>

                      {estimate ? (
                        <div className="rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3">
                          <p className="text-[12px] text-white/55">Estimated trade-in range</p>
                          <p className="text-[18px] font-semibold text-white">
                            {formatInrRange(estimate.low, estimate.high)}
                          </p>
                          <p className="mt-1 text-[11px] text-white/45">
                            Final value confirmed after inspection.
                          </p>
                        </div>
                      ) : null}

                      <div>
                        <span className="mb-2 block text-[12px] font-medium text-white/55">
                          Upload Images (up to 6)
                        </span>
                        <label
                          className={cn(
                            "flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl",
                            "border border-dashed border-white/15 bg-white/[0.02] px-4 py-6",
                            "transition-colors hover:border-white/25 hover:bg-white/[0.04]",
                          )}
                        >
                          <ImagePlus className="h-8 w-8 text-white/70" />
                          <span className="mt-2 text-[13px] text-white/65">
                            Tap to add photos
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => onFiles(e.target.files)}
                          />
                        </label>
                        {files.length > 0 ? (
                          <ul className="mt-3 space-y-2">
                            {files.map((file, idx) => (
                              <li
                                key={`${file.name}-${idx}`}
                                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white/70"
                              >
                                <span className="truncate">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="ml-2 text-white/45 hover:text-white"
                                  aria-label={`Remove ${file.name}`}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[48px] rounded-full border border-white/15 px-5 text-[13px] font-semibold text-white hover:border-white/30"
                        >
                          Back
                        </button>
                        <CtaButton
                          type="submit"
                          fullWidth
                          size="lg"
                          className="sm:flex-1"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting…
                            </>
                          ) : (
                            "Get Trade-In Estimate"
                          )}
                        </CtaButton>
                      </div>
                    </>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
