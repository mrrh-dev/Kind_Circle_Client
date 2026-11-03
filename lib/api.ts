import type { EventItem, JoinedEvent } from "./types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /** attach the login token (browser only) */
  auth?: boolean;
};

async function request<T>(path: string, { method = "GET", body, auth }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    // Loaded only in the browser, so server pages never import the auth client
    const { getToken } = await import("./token");
    const token = await getToken();
    if (!token) throw new ApiError("Please log in to continue.", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("We could not reach the server. Check your internet and try again.", 0);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(data.message || "Something went wrong. Please try again.", response.status, data.errors);
  }
  return data as T;
}

export type EventPayload = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  /** ISO string */
  eventDate: string;
};

export const api = {
  listEvents(params: { type?: string; search?: string; limit?: number } = {}) {
    const query = new URLSearchParams();
    if (params.type) query.set("type", params.type);
    if (params.search) query.set("search", params.search);
    if (params.limit) query.set("limit", String(params.limit));
    const suffix = query.toString() ? `?${query}` : "";
    return request<EventItem[]>(`/events${suffix}`);
  },
  getEvent(id: string) {
    return request<EventItem>(`/events/${id}`);
  },
  createEvent(payload: EventPayload) {
    return request<{ message: string; event: EventItem }>("/events", { method: "POST", body: payload, auth: true });
  },
  myEvents() {
    return request<EventItem[]>("/events/mine", { auth: true });
  },
  updateEvent(id: string, payload: EventPayload) {
    return request<{ message: string }>(`/events/${id}`, { method: "PUT", body: payload, auth: true });
  },
  deleteEvent(id: string) {
    return request<{ message: string }>(`/events/${id}`, { method: "DELETE", auth: true });
  },
  joinEvent(id: string) {
    return request<{ message: string }>(`/events/${id}/join`, { method: "POST", auth: true });
  },
  membership(id: string) {
    return request<{ joined: boolean }>(`/events/${id}/membership`, { auth: true });
  },
  joinedEvents() {
    return request<JoinedEvent[]>("/joined", { auth: true });
  },
};
