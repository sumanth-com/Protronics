"use client";

import { Loader2 } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import FormSuccessCard from "@/components/forms/FormSuccessCard";
import FormAlert from "@/components/forms/FormAlert";
import HoneypotField from "@/components/forms/HoneypotField";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { submitNewsletterForm } from "@/lib/forms/submitters/newsletterSubmitter";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/35 focus:border-white/40 focus:ring-2 focus:ring-white/15";

type NewsletterFormProps = {
  className?: string;
  sourcePage?: string;
};

export default function NewsletterForm({ className, sourcePage }: NewsletterFormProps) {
  const {
    values,
    setValue,
    honeypot,
    setHoneypot,
    fieldErrors,
    submitError,
    isSubmitting,
    isSuccess,
    handleSubmit,
    reset,
  } = useFormSubmission({
    initialValues: { email: "" },
    submitter: submitNewsletterForm,
    sourcePage,
  });

  if (isSuccess) {
    return (
      <FormSuccessCard
        className={cn("min-h-0 py-6", className)}
        variant="dark"
        title="You're subscribed"
        description="Thank you — we'll keep you updated with deals and new arrivals."
        submitAnotherLabel="Subscribe another email"
        onSubmitAnother={reset}
      />
    );
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className={cn("relative space-y-3", className)}
      noValidate
    >
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <label className="block">
        <span className="mb-2 block text-[12px] font-medium text-white/55">Email</span>
        <input
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
          className={inputClass}
          placeholder="you@email.com"
        />
        {fieldErrors.email ? (
          <p className="mt-1 text-[12px] text-red-400">{fieldErrors.email}</p>
        ) : null}
      </label>
      {submitError ? <FormAlert variant="error" message={submitError} /> : null}
      <CtaButton type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Subscribing…
          </>
        ) : (
          "Subscribe"
        )}
      </CtaButton>
    </form>
  );
}
