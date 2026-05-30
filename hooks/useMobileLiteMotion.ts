"use client";

import { useEffect, useState } from "react";

/** True below desktop breakpoint — use native-feel motion (no scroll-jank animations). */
export function useMobileLiteMotion() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return lite;
}
