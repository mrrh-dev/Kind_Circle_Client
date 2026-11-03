'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FiCheckCircle, FiHeart } from 'react-icons/fi';
import { ApiError, api } from '@/lib/api';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  eventId: string;
  ended: boolean;
};

export default function JoinButton({ eventId, ended }: Props) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = session?.user?.email;

  // Find out if this person already joined, so the button shows the right state
  useEffect(() => {
    if (!email) {
      setJoined(false);
      return;
    }
    let active = true;
    setChecking(true);
    api
      .membership(eventId)
      .then((result) => active && setJoined(result.joined))
      .catch(() => undefined)
      .finally(() => active && setChecking(false));
    return () => {
      active = false;
    };
  }, [email, eventId]);

  async function handleJoin() {
    if (!session) {
      toast.error('Please log in to join this event.');
      router.push(
        `/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`,
      );
      return;
    }

    setLoading(true);
    try {
      const result = await api.joinEvent(eventId);
      setJoined(true);
      toast.success(result.message);
      router.refresh(); // updates the participant count on the page
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setJoined(true);
        toast.success('You are already on the list for this event.');
      } else {
        toast.error(
          error instanceof Error ? error.message : 'Could not join the event.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (ended) {
    return (
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full"
        disabled
      >
        This event has ended
      </Button>
    );
  }

  if (joined) {
    return (
      <Button
        type="button"
        variant="success"
        size="lg"
        className="w-full"
        disabled
      >
        <FiCheckCircle className="h-5 w-5" /> You have joined this event
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleJoin}
      disabled={loading || isPending || checking}
      size="lg"
      className="w-full"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FiHeart className="h-5 w-5" />
      )}
      {loading ? 'Joining...' : 'Join Event'}
    </Button>
  );
}
