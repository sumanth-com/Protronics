"use client";

import { useEffect } from "react";
import { initFormEndpointHealth } from "@/lib/forms/googleSheetsClient";

/** Warms endpoint resolution and sets window.__FORM_HEALTH__ on startup. */
export default function FormEndpointInit() {
  useEffect(() => {
    void initFormEndpointHealth();
  }, []);
  return null;
}
