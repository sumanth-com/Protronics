"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import CtaButton from "@/components/ui/CtaButton";
import {
  isValidPhone,
  phoneInputProps,
  PHONE_VALIDATION_MESSAGE,
  sanitizePhoneInput,
} from "@/lib/forms/validation/shared";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/30 focus:border-white/40 focus:ring-2 focus:ring-white/15";

const TIME_OPTIONS = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
  "Anytime",
] as const;

type SupportCallbackModalProps = {
  open: boolean;
  onClose: () => void;
  context?: string;
};

export default function SupportCallbackModal({
  open,
  onClose,
  context = "Support Center",
}: SupportCallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState<string>(TIME_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setName("");
        setPhone("");
        setPreferredTime(TIME_OPTIONS[0]);
        setError("");
        setSubmitted(false);
        setLoading(false);
        setReferenceId("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const resetForAnother = () => {
    setSubmitted(false);
    setReferenceId("");
    setName("");
    setPhone("");
    setPreferredTime(TIME_OPTIONS[0]);
    setError("");
    setLoading(false);
  };

  const submit = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError(PHONE_VALIDATION_MESSAGE);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await submitLead({
        leadType: "callback",
        productName: `${context} — Callback Request`,
        productId: "support-center",
        price: 0,
        name: name.trim(),
        phone: phone.trim(),
        preferredTime,
        pageUrl: typeof window !== "undefined" ? window.location.href : "/support",
      });
      setReferenceId(res.referenceId ?? "");
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-[min(100%-2rem,420px)] -translate-x-1/2 -translate-y-1/2",
              "rounded-3xl border border-white/12 bg-black p-6 shadow-[0_40px_120px_rgba(0,0,0,0.85)]",
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-callback-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium tracking-[0.18em] text-white/45">
                  REQUEST CALLBACK
                </p>
                <h2 id="support-callback-title" className="mt-1 text-[18px] font-semibold text-white">
                  We&apos;ll call you back
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-6 py-4 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-white" />
                <p className="mt-3 text-[15px] font-semibold text-white">Request received</p>
                {referenceId ? (
                  <p className="mt-1 text-[13px] text-white/55">Ref: {referenceId}</p>
                ) : null}
                <p className="mt-2 text-[13px] leading-6 text-white/60">
                  Our team will call you at your preferred time.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <CtaButton onClick={resetForAnother} fullWidth>
                    Submit another form
                  </CtaButton>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-full border border-white/20 py-3 text-[13px] font-semibold text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-[12px] font-medium text-white/55">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[12px] font-medium text-white/55">Phone</span>
                  <input
                    {...phoneInputProps}
                    value={phone}
                    onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                    className={inputClass}
                    placeholder="10-digit mobile number"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[12px] font-medium text-white/55">
                    Preferred time
                  </span>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={inputClass}
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t} className="bg-black">
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                {error ? <p className="text-[13px] text-red-400">{error}</p> : null}
                <CtaButton
                  type="button"
                  fullWidth
                  disabled={loading}
                  onClick={() => void submit()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4 text-black/80" />
                      Request Callback
                    </>
                  )}
                </CtaButton>
              </div>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
