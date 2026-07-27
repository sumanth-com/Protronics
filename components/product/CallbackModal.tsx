"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  isValidPhone,
  phoneInputProps,
  PHONE_VALIDATION_MESSAGE,
  sanitizePhoneInput,
} from "@/lib/forms/validation/shared";
import { submitLead } from "@/lib/leads";
import HoneypotField from "@/components/forms/HoneypotField";
import type { ProductDetail } from "@/lib/product-detail";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/30 focus:border-white/30";

const TIME_OPTIONS = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
  "Anytime",
] as const;

type CallbackModalProps = {
  product: ProductDetail;
  open: boolean;
  onClose: () => void;
};

export default function CallbackModal({ product, open, onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState<string>(TIME_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setName("");
        setPhone("");
        setPreferredTime(TIME_OPTIONS[0]);
        setError("");
        setSubmitted(false);
        setLoading(false);
        setHoneypot("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const resetForAnother = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setPreferredTime(TIME_OPTIONS[0]);
    setError("");
    setLoading(false);
    setHoneypot("");
  };

  const submit = async () => {
    if (loading) return;
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
      await submitLead({
        leadType: "callback",
        productName: product.name,
        productId: product.id,
        price: product.price,
        name: name.trim(),
        phone: phone.trim(),
        preferredTime,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        _honeypot: honeypot,
      });
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
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className={cn(
              "fixed left-1/2 top-1/2 z-[91] w-[min(400px,92vw)] -translate-x-1/2 -translate-y-1/2",
              "rounded-2xl border border-white/[0.08] bg-[black] p-6 shadow-2xl",
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-white/50 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="pt-2 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-white" />
                <h3 className="mt-3 text-[17px] font-semibold text-white">Callback Requested</h3>
                <p className="mt-2 text-[13px] leading-5 text-white/60">
                  Our team will call you at your preferred time.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={resetForAnother}
                    className="w-full rounded-full bg-white py-2.5 text-[13px] font-semibold text-black"
                  >
                    Submit another form
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-full border border-white/20 py-2.5 text-[13px] font-semibold text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[12px] font-medium tracking-wide text-white/55">CALLBACK</p>
                <h3 className="mt-1 text-[17px] font-semibold text-white">Request Callback</h3>
                <p className="mt-2 text-[13px] text-white/55">
                  We&apos;ll call you to discuss this appliance.
                </p>

                <div className="mt-4 space-y-3 relative">
                  <HoneypotField value={honeypot} onChange={setHoneypot} />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name *"
                    className={inputClass}
                  />
                  <input
                    {...phoneInputProps}
                    value={phone}
                    onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                    placeholder="10-digit mobile number *"
                    className={inputClass}
                  />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={cn(inputClass, "appearance-none")}
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t} className="bg-[black]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {error ? <p className="mt-3 text-[13px] text-red-400">{error}</p> : null}

                <button
                  type="button"
                  onClick={submit}
                  disabled={loading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/[0.06] py-3 text-[14px] font-semibold text-white disabled:opacity-60"
                >
                  <Phone className="h-4 w-4" />
                  {loading ? "Submitting…" : "Request Callback"}
                </button>
              </>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
