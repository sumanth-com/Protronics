"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Star, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isValidPhone,
  phoneInputProps,
  PHONE_VALIDATION_MESSAGE,
  sanitizePhoneInput,
} from "@/lib/forms/validation/shared";
import { submitLead, type ContactPreference } from "@/lib/leads";
import {
  getWhatsAppReserveSuccessLink,
  type ProductDetail,
} from "@/lib/product-detail";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/30 focus:border-white/30";

type ReserveModalProps = {
  product: ProductDetail;
  open: boolean;
  onClose: () => void;
};

export default function ReserveModal({ product, open, onClose }: ReserveModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [contactPreference, setContactPreference] = useState<ContactPreference>("WhatsApp");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setName("");
        setPhone("");
        setCity("");
        setContactPreference("WhatsApp");
        setMessage("");
        setError("");
        setReferenceId(null);
        setLoading(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const resetForAnother = () => {
    setReferenceId(null);
    setName("");
    setPhone("");
    setCity("");
    setContactPreference("WhatsApp");
    setMessage("");
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
    if (!city.trim()) {
      setError("Please enter your city.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await submitLead({
        leadType: "reserve",
        productName: product.name,
        productId: product.id,
        price: product.price,
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        contactPreference,
        message: message.trim() || undefined,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      });
      setReferenceId(res.referenceId ?? null);
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
              "fixed left-1/2 top-1/2 z-[91] max-h-[90vh] w-[min(440px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto",
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

            {referenceId ? (
              <div className="pt-2 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-white" />
                <h3 className="mt-4 text-[20px] font-semibold text-white">
                  Appliance Reserved Successfully
                </h3>
                <div className="mt-4 rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-white/45">Reference ID</p>
                  <p className="mt-1 font-sans tabular-nums tracking-wide text-[15px] font-semibold text-white">
                    {referenceId}
                  </p>
                </div>
                <p className="mt-4 text-[14px] leading-6 text-white/60">
                  Our team will contact you shortly regarding availability and delivery.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={resetForAnother}
                    className="w-full rounded-full bg-white py-3 text-[13px] font-semibold text-black"
                  >
                    Submit another form
                  </button>
                  <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.04] py-3 text-[13px] font-semibold text-white"
                  >
                    Continue Browsing
                  </Link>
                  <a
                    href={getWhatsAppReserveSuccessLink(product.name, referenceId)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-[13px] font-semibold text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat On WhatsApp
                  </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[12px] font-medium tracking-wide text-white/55">RESERVE</p>
                <h3 className="mt-1 pr-8 text-[18px] font-semibold text-white">
                  Reserve This Appliance
                </h3>
                <p className="mt-2 text-[13px] leading-5 text-white/55">
                  Show genuine interest—we&apos;ll hold this unit and contact you about availability.
                </p>

                <div className="mt-5 space-y-3">
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
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City *"
                    className={inputClass}
                  />
                  <div>
                    <p className="mb-2 text-[12px] text-white/45">Preferred Contact Method *</p>
                    <div className="flex gap-2">
                      {(["WhatsApp", "Call"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setContactPreference(method)}
                          className={cn(
                            "flex-1 rounded-xl border py-2.5 text-[13px] font-medium transition-colors",
                            contactPreference === method
                              ? "border-white/40 bg-white/[0.06] text-white"
                              : "border-white/10 bg-white/[0.04] text-white/70",
                          )}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Optional message"
                    rows={2}
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                {error ? <p className="mt-3 text-[13px] text-red-400">{error}</p> : null}

                <button
                  type="button"
                  onClick={submit}
                  disabled={loading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[14px] font-semibold text-black disabled:opacity-60"
                >
                  <Star className="h-4 w-4" />
                  {loading ? "Submitting…" : "Reserve Now"}
                </button>
              </>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
