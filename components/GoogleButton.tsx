'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function GoogleButton({ redirectTo }: { redirectTo: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      // ?welcome=1 makes the site show a success toast when Google sends the person back
      const separator = redirectTo.includes('?') ? '&' : '?';
      const { error } = await signIn.social({
        provider: 'google',
        callbackURL: `${redirectTo}${separator}welcome=1`,
      });
      if (error) {
        toast.error(
          error.message || 'Google login did not work. Please try again.',
        );
        setLoading(false);
      }
    } catch {
      toast.error('Google login did not work. Please try again.');
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={loading}
      variant="outline"
      className="w-full border-border"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      Continue with Google
    </Button>
  );
}
