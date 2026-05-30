/** Content for the warranty details popup (warranty page + homepage section). */

export const WARRANTY_COVERED = [
  "Compressor and cooling system failures",
  "Thermostat, sensor, and control board faults",
  "Electrical issues present at delivery",
  "Performance defects found during our restoration checks",
] as const;

export const WARRANTY_NOT_COVERED = [
  "Physical damage after delivery (dents, scratches, broken parts)",
  "Power surge damage without adequate protection",
  "Repairs or modifications by non-Protronics technicians",
  "Normal cosmetic wear from everyday use",
] as const;

export const WARRANTY_CLAIM_STEPS = [
  "Contact us on WhatsApp or phone with your order ID.",
  "Share a short video or photos showing the issue.",
  "We schedule diagnosis (typically 24–48 hours in Bengaluru metro).",
  "Repair or replacement is handled per our service policy—by our team.",
] as const;

export const WARRANTY_SUMMARY = {
  title: "1-Year Protronics Warranty",
  duration:
    "Every refurbished appliance includes 1 year of warranty coverage starting from your delivery date.",
  note: "Warranty is registered to the original buyer and delivery address. Transfer may be available in eligible cases—contact us before resale.",
} as const;
