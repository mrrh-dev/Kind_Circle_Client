'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FiAlertTriangle, FiHeart, FiRefreshCw } from 'react-icons/fi';
import { api } from '@/lib/api';
import { formatLongDate } from '@/lib/format';
import type { JoinedEvent } from '@/lib/types';
import EventCard from './EventCard';
import { EventGridSkeleton } from './Skeletons';
import { Button, buttonVariants } from '@/components/ui/button';

export default function JoinedEventsClient() {
  const [items, setItems] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItems(await api.joinedEvents());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not load your joined events.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="page-shell py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <span className="section-eyebrow">Your commitments</span>
        <h1 className="section-title">Joined events</h1>
        <p className="section-lead">
          Everything you have signed up for, with the earliest event first.
        </p>
      </header>

      {loading ? (
        <EventGridSkeleton count={3} />
      ) : error ? (
        <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
          <FiAlertTriangle className="h-10 w-10 text-warning" />
          <h2 className="mt-4 font-display text-xl font-bold">
            We could not load your events
          </h2>
          <p className="mt-2 max-w-md text-foreground/70">{error}</p>
          <Button type="button" onClick={load} className="mt-6">
            <FiRefreshCw className="h-4 w-4" /> Try again
          </Button>
        </div>
      ) : items.length === 0 ? (
        <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
          <FiHeart className="h-10 w-10 text-primary" />
          <h2 className="mt-4 font-display text-xl font-bold">
            You have not joined any events yet
          </h2>
          <p className="mt-2 max-w-md text-foreground/70">
            Browse what is coming up and pick something close to home.
          </p>
          <Link
            href="/events"
            className={buttonVariants({ className: 'mt-6' })}
          >
            Explore upcoming events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <EventCard
              key={item.joinId}
              event={item.event}
              note={`You joined on ${formatLongDate(item.joinedAt)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
