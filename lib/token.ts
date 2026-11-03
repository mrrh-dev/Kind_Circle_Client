"use client";

import { authClient } from "./auth-client";

/**
 * Gets the short lived JWT that the Express server expects in the
 * Authorization header. The token is cached until one minute before it expires.
 */

let cached: { token: string; expiresAt: number } | null = null;

function readExpiry(token: string): number {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(payload));
    return typeof json.exp === "number" ? json.exp * 1000 : Date.now() + 5 * 60_000;
  } catch {
    return Date.now() + 5 * 60_000;
  }
}

export async function getToken(): Promise<string | null> {
  if (cached && cached.expiresAt - Date.now() > 60_000) return cached.token;

  const { data } = await authClient.token();
  if (!data?.token) {
    cached = null;
    return null;
  }
  cached = { token: data.token, expiresAt: readExpiry(data.token) };
  return data.token;
}

export function clearToken() {
  cached = null;
}
