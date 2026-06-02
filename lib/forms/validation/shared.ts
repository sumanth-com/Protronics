const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_DIGITS_LENGTH = 10;

const PHONE_DIGITS_RE = /^\d{10}$/;

export const PHONE_VALIDATION_MESSAGE = "Enter a valid 10-digit phone number.";

/** Strip non-digits and cap at 10 characters (for controlled inputs). */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_DIGITS_LENGTH);
}

/** Normalize stored/submitted phone to digits only. */
export function normalizePhone(phone: string): string {
  return sanitizePhoneInput(phone.trim());
}

export function isValidPhone(phone: string): boolean {
  return PHONE_DIGITS_RE.test(normalizePhone(phone));
}

export function required(value: string, message = "This field is required."): string | undefined {
  return value.trim() ? undefined : message;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export const phoneInputProps = {
  type: "tel" as const,
  inputMode: "numeric" as const,
  autoComplete: "tel-national" as const,
  maxLength: PHONE_DIGITS_LENGTH,
  pattern: "[0-9]{10}",
};
