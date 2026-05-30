"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import ContactAmbient from "@/components/contact/ContactAmbient";
import SectionHeader from "@/components/contact/SectionHeader";
import { BUSINESS, FRIDGE_PRODUCTS } from "@/lib/contact";
import { cn } from "@/lib/utils";

const ContactLocationMap = dynamic(
  () => import("@/components/contact/ContactLocationMap"),
  {
    loading: () => (
      <div
        className="min-h-[280px] animate-pulse rounded-3xl border border-white/12 bg-white/[0.04] lg:min-h-[420px]"
        aria-hidden
      />
    ),
  },
);

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  product: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  product: "",
  message: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[\d\s+\-()]{8,16}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!values.city.trim()) errors.city = "Tell us your city for delivery.";
  if (!values.product) errors.product = "Select a product type.";
  if (!values.message.trim()) errors.message = "Share a few details so we can help.";
  return errors;
}

const inputClass = (hasError: boolean) =>
  cn(
    "w-full rounded-2xl px-4 py-2.5 text-[14px] text-white",
    "border bg-white/[0.04] placeholder:text-white/35",
    "outline-none transition-[border-color,box-shadow] duration-150",
    "[&:-webkit-autofill]:border-white/12",
    "[&:-webkit-autofill]:[-webkit-text-fill-color:rgb(255_255_255)]",
    "[&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_rgb(14_14_14)_inset]",
    hasError
      ? "border-red-400/50 focus:border-red-400/60 focus:ring-2 focus:ring-red-400/15"
      : "border-white/12 focus:border-white/40 focus:ring-2 focus:ring-white/15",
  );

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof FormState, val: string) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    setValues(initial);
  };

  return (
    <section id="contact" className="relative bg-black py-12 sm:py-16 md:py-20">
      <ContactAmbient variant="hero" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeader
          align="center"
          title="Tell Us What You're Looking For"
          description="Submit your details—we'll reach out with curated refrigerator options, pricing, and delivery timelines."
          className="mx-auto max-w-2xl [&_p]:mt-2 [&_p]:text-[13px] [&_p]:leading-6"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <ContactLocationMap />

          <div
            className={cn(
              "relative isolate flex flex-col",
              "rounded-3xl border border-white/12 bg-black",
              "p-5 sm:p-6",
            )}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-white" />
                <h3 className="mt-5 text-[22px] font-semibold text-white">
                  Request received
                </h3>
                <p className="mt-2 max-w-md text-[14px] leading-7 text-white/65">
                  Our team will contact you shortly. For faster assistance,
                  continue on WhatsApp.
                </p>
                <CtaButton
                  href={BUSINESS.whatsappMessage}
                  external
                  className="mt-6"
                >
                  <WhatsAppIcon className="h-4 w-4 text-black/80" />
                  Open WhatsApp
                </CtaButton>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-[13px] text-white/50 transition-colors duration-150 hover:text-white/80"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.fullName}>
                    <input
                      type="text"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className={inputClass(!!errors.fullName)}
                      placeholder="Your full name"
                    />
                  </Field>
                  <Field label="Phone Number" error={errors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass(!!errors.phone)}
                      placeholder="+91 90000 00000"
                    />
                  </Field>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClass(!!errors.email)}
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <input
                      type="text"
                      value={values.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={inputClass(!!errors.city)}
                      placeholder="Bengaluru"
                    />
                  </Field>
                </div>

                <Field label="Interested Product" error={errors.product}>
                  <div className="relative">
                    <select
                      value={values.product}
                      onChange={(e) => update("product", e.target.value)}
                      className={cn(inputClass(!!errors.product), "appearance-none pr-11")}
                    >
                      <option value="" className="bg-black">
                        Select refrigerator type
                      </option>
                      {FRIDGE_PRODUCTS.map((p) => (
                        <option key={p} value={p} className="bg-black">
                          {p}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                      aria-hidden
                    />
                  </div>
                </Field>

                <Field label="Message" error={errors.message}>
                  <textarea
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={4}
                    className={cn(inputClass(!!errors.message), "block resize-y min-h-[96px]")}
                    placeholder="Budget, size, delivery timeline, or any questions…"
                  />
                </Field>

                <CtaButton
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={status === "loading"}
                  className="mt-1 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black/80" />
                      Sending…
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </CtaButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="mb-1.5 block shrink-0 text-[12px] font-medium tracking-wide text-white/55">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 shrink-0 text-[12px] text-red-400/90">{error}</p>
      ) : null}
    </div>
  );
}
