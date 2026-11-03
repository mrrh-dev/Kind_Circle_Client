// Events are local community events in Bangladesh, so every date is shown in
// Dhaka time. Using one fixed zone also keeps the server and browser output identical.
const ZONE = "Asia/Dhaka";

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: ZONE,
  }).format(new Date(iso));
}

export function formatShortDate(iso: string): { day: string; month: string } {
  const date = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: ZONE }).format(date),
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: ZONE }).format(date),
  };
}

export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: ZONE,
  }).format(new Date(iso));
}

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}

/** ISO string -> value for <input type="datetime-local"> in the browser's own zone */
export function toDateTimeLocal(iso: string): string {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

/** Earliest value the date picker should allow (now, in the browser's zone) */
export function minDateTimeLocal(): string {
  return toDateTimeLocal(new Date().toISOString());
}

export function initials(name?: string | null): string {
  if (!name) return "K";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
