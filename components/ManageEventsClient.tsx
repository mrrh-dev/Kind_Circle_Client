"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FiAlertTriangle, FiCalendar, FiEdit2, FiExternalLink, FiMapPin, FiPlusCircle, FiRefreshCw, FiTrash2, FiUsers } from "react-icons/fi";
import { api } from "@/lib/api";
import { formatEventDate, isPast, toDateTimeLocal } from "@/lib/format";
import type { EventItem } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EventForm from "./EventForm";
import EventImage from "./EventImage";
import { RowSkeleton } from "./Skeletons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ManageEventsClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setEvents(await api.myEvents());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load your events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmDelete() {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await api.deleteEvent(deleting._id);
      setEvents((previous) => previous.filter((item) => item._id !== deleting._id));
      toast.success(`"${deleting.title}" was deleted.`);
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the event.");
    } finally {
      setDeleteBusy(false);
    }
  }

  return (
    <div className="page-shell py-12 md:py-16">
      <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="section-eyebrow">Your dashboard</span>
          <h1 className="section-title">Manage events</h1>
          <p className="section-lead">Update the details of events you host, or remove the ones that are cancelled.</p>
        </div>
        <Link href="/create-event" className={buttonVariants({ className: "shrink-0" })}>
          <FiPlusCircle className="h-4 w-4" /> New event
        </Link>
      </header>

      {loading ? (
        <RowSkeleton />
      ) : error ? (
        <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
          <FiAlertTriangle className="h-10 w-10 text-warning" />
          <h2 className="mt-4 font-display text-xl font-bold">We could not load your events</h2>
          <p className="mt-2 max-w-md text-foreground/70">{error}</p>
          <Button type="button" onClick={load} className="mt-6">
            <FiRefreshCw className="h-4 w-4" /> Try again
          </Button>
        </div>
      ) : events.length === 0 ? (
        <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
          <FiCalendar className="h-10 w-10 text-primary" />
          <h2 className="mt-4 font-display text-xl font-bold">You have not hosted any events yet</h2>
          <p className="mt-2 max-w-md text-foreground/70">Create your first event and invite your neighbours.</p>
          <Link href="/create-event" className={buttonVariants({ className: "mt-6" })}>
            Create an event
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => {
            const ended = isPast(event.eventDate);
            return (
              <li key={event._id} className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-48">
                  <EventImage src={event.thumbnail} alt={`${event.title} thumbnail`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{event.eventType}</Badge>
                    {ended && <Badge variant="neutral">Ended</Badge>}
                  </div>
                  <h2 className="mt-2 line-clamp-2 font-display text-xl font-bold">{event.title}</h2>
                  <ul className="mt-2 space-y-1 text-sm text-foreground/70">
                    <li className="flex items-center gap-2">
                      <FiCalendar className="h-4 w-4 shrink-0 text-primary" /> {formatEventDate(event.eventDate)}
                    </li>
                    <li className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FiUsers className="h-4 w-4 shrink-0 text-primary" /> {event.participantCount} joined
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 sm:w-44 sm:flex-col">
                  <Link href={`/events/${event._id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "flex-1 sm:flex-none" })}>
                    <FiExternalLink className="h-4 w-4" /> View
                  </Link>
                  <Button type="button" onClick={() => setEditing(event)} size="sm" className="flex-1 sm:flex-none">
                    <FiEdit2 className="h-4 w-4" /> Update
                  </Button>
                  <Button type="button" onClick={() => setDeleting(event)} variant="destructive-outline" size="sm" className="flex-1 sm:flex-none">
                    <FiTrash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Update dialog */}
      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent aria-describedby={undefined}>
          {editing && (
            <>
              <DialogHeader>
                <DialogTitle>Update event</DialogTitle>
              </DialogHeader>
              {isPast(editing.eventDate) && (
                <p className="rounded-lg bg-warning/15 px-4 py-3 text-sm">
                  This event has already taken place. Choose a new future date to save changes.
                </p>
              )}
              <EventForm
                idPrefix="update"
                initialValues={{
                  title: editing.title,
                  description: editing.description,
                  eventType: editing.eventType,
                  thumbnail: editing.thumbnail,
                  location: editing.location,
                  eventDate: toDateTimeLocal(editing.eventDate),
                }}
                submitLabel="Save changes"
                savingLabel="Saving..."
                onCancel={() => setEditing(null)}
                onSubmit={async (payload) => {
                  await api.updateEvent(editing._id, payload);
                  toast.success("Event updated successfully.");
                  setEditing(null);
                  await load();
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !open && !deleteBusy && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            {deleting && (
              <AlertDialogDescription>
                &ldquo;{deleting.title}&rdquo; will be removed for everyone
                {deleting.participantCount > 0
                  ? `, and ${deleting.participantCount} ${deleting.participantCount === 1 ? "person" : "people"} who joined will lose their spot`
                  : ""}
                . This cannot be undone.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBusy}>Keep event</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteBusy}
              onClick={confirmDelete}
            >
              {deleteBusy && <Loader2 className="h-4 w-4 animate-spin" />}
              {deleteBusy ? "Deleting..." : "Yes, delete it"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
