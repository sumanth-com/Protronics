const PHONE_RE = /^[\d\s+\-()]{8,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone.trim());
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function required(value: string, message = "This field is required."): string | undefined {
  return value.trim() ? undefined : message;
}
