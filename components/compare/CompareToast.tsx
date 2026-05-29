"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { COMPARE_TOAST_EVENT } from "@/hooks/useProductStore";

export default function CompareToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      window.setTimeout(() => setVisible(false), 3200);
    };
    window.addEventListener(COMPARE_TOAST_EVENT, show);
    return () => window.removeEventListener(COMPARE_TOAST_EVENT, show);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed bottom-28 left-1/2 z-[60] w-[min(92vw,380px)] -translate-x-1/2 sm:bottom-24"
          role="status"
        >
          <div className="rounded-2xl border border-[#39ff88]/25 bg-black/90 px-4 py-3.5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_40px_rgba(57,255,136,0.08)] backdrop-blur-xl">
            <p className="text-[13px] font-medium text-white">
              You can compare up to 3 appliances.
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
