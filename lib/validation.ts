import { EVENT_TYPES } from "./constants";
import type { EventFormValues, FieldErrors } from "./types";

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** The three password rules from the brief */
export function passwordChecks(password: string) {
  return {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    length: password.length >= 6,
  };
}

export function validatePassword(password: string): string | null {
  const checks = passwordChecks(password);
  if (!checks.length) return "Password must be at least 6 characters long.";
  if (!checks.upper) return "Password must include at least one uppercase letter.";
  if (!checks.lower) return "Password must include at least one lowercase letter.";
  return null;
}

export type LoginField = "email" | "password";

export function validateLogin(values: { email: string; password: string }): FieldErrors<LoginField> {
  const errors: FieldErrors<LoginField> = {};
  if (!isEmail(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.password) errors.password = "Enter your password.";
  return errors;
}

export type RegisterField = "name" | "email" | "photoURL" | "password";

export function validateRegister(values: {
  name: string;
  email: string;
  photoURL: string;
  password: string;
}): FieldErrors<RegisterField> {
  const errors: FieldErrors<RegisterField> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!isEmail(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!isHttpUrl(values.photoURL.trim())) {
    errors.photoURL = "Enter a photo link that starts with http or https.";
  }
  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  return errors;
}

export type ProfileField = "name" | "photoURL";

export function validateProfile(values: { name: string; photoURL: string }): FieldErrors<ProfileField> {
  const errors: FieldErrors<ProfileField> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!isHttpUrl(values.photoURL.trim())) {
    errors.photoURL = "Enter a photo link that starts with http or https.";
  }
  return errors;
}

export type EventField = keyof EventFormValues;

export function validateEventForm(values: EventFormValues): FieldErrors<EventField> {
  const errors: FieldErrors<EventField> = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const location = values.location.trim();

  if (title.length < 3 || title.length > 100) errors.title = "Title must be 3 to 100 characters.";
  if (description.length < 20 || description.length > 2000) {
    errors.description = "Tell people more: description must be 20 to 2000 characters.";
  }
  if (!(EVENT_TYPES as readonly string[]).includes(values.eventType)) {
    errors.eventType = "Choose an event type.";
  }
  if (!isHttpUrl(values.thumbnail.trim())) {
    errors.thumbnail = "Enter an image link that starts with http or https.";
  }
  if (location.length < 3 || location.length > 150) {
    errors.location = "Location must be 3 to 150 characters.";
  }

  const date = new Date(values.eventDate);
  if (!values.eventDate || Number.isNaN(date.getTime())) {
    errors.eventDate = "Choose the date and time of the event.";
  } else if (date.getTime() <= Date.now()) {
    errors.eventDate = "Past dates are not allowed. Pick a future date and time.";
  }
  return errors;
}
