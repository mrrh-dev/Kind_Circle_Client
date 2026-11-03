import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiUser, FiUsers } from "react-icons/fi";
import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import EventImage from "@/components/EventImage";
import JoinButton from "@/components/JoinButton";
import { ApiError, api } from "@/lib/api";
import { formatEventDate, formatLongDate, isPast } from "@/lib/format";
import type { EventItem } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

async function loadEvent(id: string): Promise<EventItem> {
  try {
    return await api.getEvent(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error; // shown by the error page
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const event = await api.getEvent(id);
    return { title: event.title, description: event.description.slice(0, 150) };
  } catch {
    return { title: "Event details" };
  }
}

export default async function EventDetailsPage({ params }: Props) {
  const { id } = await params;
  const event = await loadEvent(id);
  const ended = isPast(event.eventDate);

  return (
    <div className="page-shell py-10 md:py-14">
      <Link href="/events" className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-6 -ml-3" })}>
        <FiArrowLeft className="h-4 w-4" /> Back to upcoming events
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        <article>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted shadow-lg">
            <EventImage src={event.thumbnail} alt={`${event.title} thumbnail`} />
            <Badge variant="secondary" className="absolute left-4 top-4 px-4 py-1.5 text-sm shadow">
              {event.eventType}
            </Badge>
          </div>

          <h1 className="section-title mt-8">{event.title}</h1>

          <div className="mt-6 flex items-center gap-3">
            <Avatar src={event.creatorPhoto} name={event.creatorName} className="h-11 w-11" />
            <div className="text-sm">
              <p className="text-muted-foreground">Organised by</p>
              <p className="font-semibold">{event.creatorName}</p>
            </div>
          </div>

          <h2 className="mt-10 font-display text-2xl font-bold">About this event</h2>
          <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-foreground/80">
            {event.description}
          </p>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface-card p-6 shadow-lg">
            <h2 className="font-display text-xl font-bold">Event details</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <FiCalendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{formatLongDate(event.eventDate)}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FiClock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Starts</p>
                  <p className="font-semibold">{formatEventDate(event.eventDate)}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FiMapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{event.location}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <FiUsers className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined so far</p>
                  <p className="font-semibold">
                    {event.participantCount} {event.participantCount === 1 ? "person" : "people"}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <FiUser className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Event type</p>
                  <p className="font-semibold">{event.eventType}</p>
                </div>
              </li>
            </ul>

            <div className="mt-7">
              <JoinButton eventId={event._id} ended={ended} />
              <p className="mt-3 text-center text-sm text-muted-foreground">
                You can read everything without an account. Logging in is only needed to join.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
