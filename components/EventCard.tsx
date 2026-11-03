import Link from 'next/link';
import { FiArrowRight, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { formatEventDate, formatShortDate, isPast } from '@/lib/format';
import type { EventItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import EventImage from './EventImage';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';

type Props = {
  event: EventItem;
  /** small line shown above the button, for example "Joined on 3 Nov 2026" */
  note?: string;
};

export default function EventCard({ event, note }: Props) {
  const { day, month } = formatShortDate(event.eventDate);
  const ended = isPast(event.eventDate);

  return (
    <Card className="group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <EventImage
          src={event.thumbnail}
          alt={`${event.title} thumbnail`}
          className="transition duration-500 group-hover:scale-105"
        />
        <Badge variant="secondary" className="absolute left-3 top-3 shadow">
          {event.eventType}
        </Badge>
        <div className="absolute right-3 top-3 flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-background text-center shadow">
          <span className="font-display text-xl font-bold leading-none">
            {day}
          </span>
          <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
            {month}
          </span>
        </div>
        {ended && (
          <span className="absolute inset-x-0 bottom-0 bg-neutral/80 px-3 py-1.5 text-center text-sm font-semibold text-neutral-content">
            This event has ended
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-xl font-bold leading-snug">
          {event.title}
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-foreground/75">
          <li className="flex items-start gap-2.5">
            <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <FiClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{formatEventDate(event.eventDate)}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <FiUsers className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              {event.participantCount === 0
                ? 'Be the first to join'
                : `${event.participantCount} ${event.participantCount === 1 ? 'person has' : 'people have'} joined`}
            </span>
          </li>
        </ul>

        <div className="mt-auto pt-5">
          {note && (
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              {note}
            </p>
          )}
          <Link
            href={`/events/${event._id}`}
            className={buttonVariants({ className: 'w-full' })}
          >
            View Event <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
