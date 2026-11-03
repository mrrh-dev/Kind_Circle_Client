import Link from "next/link";
import { FiArrowRight, FiCalendar, FiWifiOff } from "react-icons/fi";
import { api } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import EventCard from "../EventCard";
import { buttonVariants } from "@/components/ui/button";

async function loadEvents(): Promise<{ events: EventItem[]; failed: boolean }> {
  try {
    // The server uses MongoDB .sort().limit(6) to return the six soonest events
    return { events: await api.listEvents({ limit: 6 }), failed: false };
  } catch {
    return { events: [], failed: true };
  }
}

export default async function RecentEvents() {
  const { events, failed } = await loadEvents();

  return (
    <section className="bg-muted py-20 md:py-24">
      <div className="page-shell">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-eyebrow">Happening soon</span>
            <h2 className="section-title">Recent upcoming events</h2>
            <p className="section-lead">The next six events people have posted. Pick one and show up.</p>
          </div>
          <Link href="/events" className={buttonVariants({ variant: "brand", className: "shrink-0" })}>
            See all events <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          {failed ? (
            <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
              <FiWifiOff className="h-10 w-10 text-warning" />
              <h3 className="mt-4 font-display text-xl font-bold">We could not load events right now</h3>
              <p className="mt-2 max-w-md text-foreground/70">
                The server may be waking up. Please refresh the page in a few seconds.
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
              <FiCalendar className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">No upcoming events yet</h3>
              <p className="mt-2 max-w-md text-foreground/70">
                Be the one who starts something good. Host the first event in your area.
              </p>
              <Link href="/create-event" className={buttonVariants({ className: "mt-6" })}>
                Host an Event
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
