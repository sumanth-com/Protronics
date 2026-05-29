"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import ContactAmbient from "@/components/contact/ContactAmbient";
import ContactLocationMap from "@/components/contact/ContactLocationMap";
import SectionHeader from "@/components/contact/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";
import { BUSINESS, FRIDGE_PRODUCTS } from "@/lib/contact";
import { cn } from "@/lib/utils";

const VIEWPORT_H =
  "min-h-[calc(100svh-60px)] max-h-[calc(100svh-60px)] sm:min-h-[calc(100svh-64px)] sm:max-h-[calc(100svh-64px)]";

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
    "outline-none transition-[border-color,box-shadow]",
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
    <section
      id="contact"
      className={cn(
        "relative flex flex-col overflow-hidden bg-black",
        VIEWPORT_H,
      )}
    >
      <ContactAmbient variant="hero" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col min-h-0 overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="shrink-0">
            <SectionHeader
              align="center"
              title="Tell Us What You're Looking For"
              description="Submit your details—we'll reach out with curated refrigerator options, pricing, and delivery timelines."
              className="mx-auto max-w-2xl [&_p]:mt-2 [&_p]:text-[13px] [&_p]:leading-6"
            />
          </div>

          <motion.div
            variants={fadeUp}
            className={cn(
              "mt-4 flex min-h-0 flex-1 flex-col gap-4",
              "lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-5",
            )}
          >
            <ContactLocationMap className="h-full min-h-0" />

            <div
              className={cn(
                "relative isolate flex h-full min-h-0 flex-col",
                "rounded-3xl border border-white/12 bg-black",
                "outline-none ring-0 focus-within:outline-none focus-within:ring-0",
                "p-5",
              )}
            >
              <div className="flex flex-1 flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                    >
                      <CheckCircle2 className="h-14 w-14 text-white" />
                    </motion.div>
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
                      Open WhatsApp
                    </CtaButton>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 text-[13px] text-white/50 transition-colors hover:text-white/80"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-3"
                    noValidate
                  >
                    <div className="grid shrink-0 gap-3 sm:grid-cols-2">
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

                    <div className="grid shrink-0 gap-3 sm:grid-cols-2">
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

                    <Field label="Interested Product" error={errors.product} className="shrink-0">
                      <div className="relative">
                        <select
                          value={values.product}
                          onChange={(e) => update("product", e.target.value)}
                          className={cn(
                            inputClass(!!errors.product),
                            "appearance-none pr-11",
                          )}
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
                        rows={3}
                        className={cn(
                          inputClass(!!errors.message),
                          "block resize-none overflow-hidden",
                        )}
                        placeholder="Budget, size, delivery timeline, or any questions…"
                      />
                    </Field>

                    <CtaButton
                      type="submit"
                      size="lg"
                      fullWidth
                      disabled={status === "loading"}
                      className="shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
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
                  </motion.form>
                )}
              </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
