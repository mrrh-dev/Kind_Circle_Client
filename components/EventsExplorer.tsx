'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  FiAlertTriangle,
  FiCalendar,
  FiRefreshCw,
  FiSearch,
} from 'react-icons/fi';
import { api } from '@/lib/api';
import { EVENT_TYPES } from '@/lib/constants';
import type { EventItem } from '@/lib/types';
import EventCard from './EventCard';
import { EventGridSkeleton } from './Skeletons';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EventsExplorer() {
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [type, setType] = useState('');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // wait a moment after typing before asking the server
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setEvents(await api.listEvents({ type, search: debounced }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load events.');
    } finally {
      setLoading(false);
    }
  }, [type, debounced]);

  useEffect(() => {
    load();
  }, [load]);

  const filtering = Boolean(type || debounced);

  return (
    <div>
      <div className="surface-card flex flex-col gap-4 p-4 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search events by title or location</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or location, e.g. Mirpur"
            className="h-12 pl-12"
          />
        </label>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by event type"
        >
          {['', ...EVENT_TYPES].map((option) => (
            <Button
              key={option || 'all'}
              type="button"
              onClick={() => setType(option)}
              aria-pressed={type === option}
              variant={type === option ? 'default' : 'outline'}
              size="sm"
            >
              {option || 'All types'}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8" aria-live="polite">
        {loading ? (
          <EventGridSkeleton />
        ) : error ? (
          <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
            <FiAlertTriangle className="h-10 w-10 text-warning" />
            <h2 className="mt-4 font-display text-xl font-bold">
              We could not load the events
            </h2>
            <p className="mt-2 max-w-md text-foreground/70">{error}</p>
            <Button type="button" onClick={load} className="mt-6">
              <FiRefreshCw className="h-4 w-4" /> Try again
            </Button>
          </div>
        ) : events.length === 0 ? (
          <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
            <FiCalendar className="h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-xl font-bold">
              {filtering
                ? 'No events match your search'
                : 'No upcoming events yet'}
            </h2>
            <p className="mt-2 max-w-md text-foreground/70">
              {filtering
                ? 'Try a different word or choose another event type.'
                : 'Nothing is scheduled right now. Why not host the first one?'}
            </p>
            {filtering ? (
              <Button
                type="button"
                onClick={() => {
                  setSearch('');
                  setType('');
                }}
                variant="brand"
                className="mt-6"
              >
                Clear filters
              </Button>
            ) : (
              <Link
                href="/create-event"
                className={buttonVariants({ className: 'mt-6' })}
              >
                Host an Event
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm font-medium text-muted-foreground">
              Showing {events.length} upcoming{' '}
              {events.length === 1 ? 'event' : 'events'}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
