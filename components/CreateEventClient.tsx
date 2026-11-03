'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import EventForm from './EventForm';

export default function CreateEventClient() {
  const router = useRouter();

  return (
    <div className="page-shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <span className="section-eyebrow">Host an event</span>
          <h1 className="section-title">Create a new event</h1>
          <p className="section-lead">
            Tell the community what you are planning. Your event appears on the
            Upcoming Events page as soon as you publish it.
          </p>
        </header>

        <div className="surface-card p-6 shadow-lg sm:p-8">
          <EventForm
            idPrefix="create"
            submitLabel="Publish event"
            savingLabel="Publishing..."
            onSubmit={async (payload) => {
              await api.createEvent(payload);
              toast.success(
                'Your event is live! Taking you to Upcoming Events.',
              );
              router.push('/events');
            }}
          />
        </div>
      </div>
    </div>
  );
}
