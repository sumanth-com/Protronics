"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import ImageUploader from "@/components/trade-in/ImageUploader";
import FormAlert from "@/components/forms/FormAlert";
import CtaButton from "@/components/ui/CtaButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { submitTradeInLead } from "@/lib/trade-in-leads";
import {
  ACCEPTED_BRANDS,
  AGE_OPTIONS,
  APPLIANCE_CATEGORIES,
  CONDITION_OPTIONS,
  TRADE_IN_LINKS,
  WORKING_STATUS_OPTIONS,
  estimateTradeInValue,
  tradeInGlass,
  tradeInSection,
  type AgeOption,
  type ApplianceTypeId,
  type ConditionOption,
} from "@/lib/trade-in";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  city: string;
  applianceType: ApplianceTypeId;
  brand: string;
  model: string;
  age: AgeOption;
  condition: ConditionOption;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>> & { images?: string };

const initial: FormState = {
  name: "",
  phone: "",
  city: "",
  applianceType: "refrigerator",
  brand: ACCEPTED_BRANDS[0],
  model: "",
  age: AGE_OPTIONS[1],
  condition: "Good",
  description: "",
};

const inputClass = (hasError: boolean) =>
  cn(
    "trade-in-field w-full min-h-[48px] rounded-xl border bg-theme-input-bg px-4 py-3 text-[14px] text-theme-fg",
    "placeholder:text-theme-fg-faint outline-none focus:border-theme-accent/50 focus:ring-2 focus:ring-theme-accent/15",
    hasError ? "border-red-400/50" : "border-theme-border",
  );

function validate(values: FormState, fileCount: number): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[\d\s+\-()]{8,16}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!values.city.trim()) errors.city = "City is required.";
  if (!values.model.trim()) errors.model = "Model is required.";
  if (fileCount === 0) errors.images = "Add at least one photo.";
  return errors;
}

export default function TradeInForm() {
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
        workingStatus: WORKING_STATUS_OPTIONS[0],
      }),
    [values.applianceType, values.brand, values.age, values.condition],
  );

  const update = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFiles = (next: File[]) => {
    setFiles(next.slice(0, 5));
    if (errors.images) setErrors((e) => ({ ...e, images: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values, files.length);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    setSubmitError("");
    try {
      const res = await submitTradeInLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        applianceType:
          APPLIANCE_CATEGORIES.find((c) => c.id === values.applianceType)?.label ??
          values.applianceType,
        brand: values.brand,
        model: values.model.trim(),
        age: values.age,
        condition: values.condition,
        description: values.description.trim(),
        imageCount: files.length,
        imageNames: files.map((f) => f.name).join(", "),
        estimatedLow: estimate?.low,
        estimatedHigh: estimate?.high,
        pageUrl: typeof window !== "undefined" ? window.location.href : "/sell",
        leadSource: "Trade-In Form",
      });
      setReferenceId(res.referenceId);
      setStatus("success");
      setValues(initial);
      setFiles([]);
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit. Please try again.",
      );
    }
  };

  return (
    <section id="sell-form" className={cn("py-8 sm:py-10", tradeInSection)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="text-center">
          <h2 className="text-[20px] font-semibold text-theme-fg sm:text-[22px]">Sell Your Appliance</h2>
          <p className="mx-auto mt-1 max-w-md text-[14px] leading-relaxed text-theme-fg-muted">
            Submit details and photos—we&apos;ll respond with your valuation.
          </p>
        </header>

        <div className={cn("mt-5 p-4 sm:p-6", tradeInGlass)}>
          {status === "success" ? (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-theme-accent" />
              <h3 className="mt-3 text-[18px] font-semibold text-theme-fg">Request Received</h3>
              <p className="mt-2 text-[14px] text-theme-fg-muted">
                Reference: <span className="font-semibold text-theme-fg">{referenceId}</span>
              </p>
              <p className="mt-2 text-[13px] text-theme-fg-muted">
                We&apos;ll contact you shortly with your valuation.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <CtaButton href={TRADE_IN_LINKS.shop}>Browse Upgrades</CtaButton>
                <a
                  href={TRADE_IN_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-theme-border px-5 py-3 text-[13px] font-semibold text-theme-fg"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {submitError ? <FormAlert variant="error" message={submitError} /> : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
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
                    <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
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
                    <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                    City *
                  </span>
                  <input
                    value={values.city}
                    onChange={(e) => update("city", e.target.value)}
                    className={inputClass(!!errors.city)}
                    placeholder="Bengaluru"
                    autoComplete="address-level2"
                  />
                  {errors.city ? (
                    <p className="mt-1 text-[12px] text-red-500">{errors.city}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                    Appliance Type *
                  </span>
                  <select
                    value={values.applianceType}
                    onChange={(e) => update("applianceType", e.target.value as ApplianceTypeId)}
                    className={inputClass(false)}
                  >
                    {APPLIANCE_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                    Brand *
                  </span>
                  <select
                    value={values.brand}
                    onChange={(e) => update("brand", e.target.value)}
                    className={inputClass(false)}
                  >
                    {ACCEPTED_BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                    Model *
                  </span>
                  <input
                    value={values.model}
                    onChange={(e) => update("model", e.target.value)}
                    className={inputClass(!!errors.model)}
                    placeholder="e.g. LG GL-D322ABNX"
                  />
                  {errors.model ? (
                    <p className="mt-1 text-[12px] text-red-500">{errors.model}</p>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                    Age *
                  </span>
                  <select
                    value={values.age}
                    onChange={(e) => update("age", e.target.value as AgeOption)}
                    className={inputClass(false)}
                  >
                    {AGE_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                    Condition *
                  </span>
                  <select
                    value={values.condition}
                    onChange={(e) => update("condition", e.target.value as ConditionOption)}
                    className={inputClass(false)}
                  >
                    {CONDITION_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <ImageUploader
                files={files}
                onChange={onFiles}
                max={5}
                required
                error={errors.images}
              />

              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-theme-fg-muted">
                  Description
                </span>
                <textarea
                  value={values.description}
                  onChange={(e) => update("description", e.target.value)}
                  className={cn(inputClass(false), "min-h-[80px] resize-y")}
                  placeholder="Any issues, dents, or notes…"
                  rows={3}
                />
              </label>

              <CtaButton type="submit" fullWidth size="lg" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit"
                )}
              </CtaButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
