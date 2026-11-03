'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FiMail, FiSend } from 'react-icons/fi';
import { isEmail } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isEmail(email.trim())) {
      setError('Enter a valid email address.');
      toast.error('Please enter a valid email address.');
      return;
    }
    setError('');
    setEmail('');
    toast.success('Thank you for subscribing to the KindCircle newsletter!');
  }

  return (
    <section className="page-shell pb-4">
      <div className="relative overflow-hidden rounded-2xl bg-neutral px-6 py-14 text-neutral-content sm:px-12 md:py-16">
        <div
          className="dot-grid pointer-events-none absolute inset-0 text-secondary opacity-25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              <FiMail className="h-4 w-4" /> Newsletter
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              Never miss a chance to help
            </h2>
            <p className="mt-4 text-neutral-content/80">
              One short email a week with the best upcoming drives, plantations
              and camps near you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'newsletter-error' : undefined}
                className="h-12"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="shrink-0"
              >
                Subscribe <FiSend className="h-4 w-4" />
              </Button>
            </div>
            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="mt-2 text-sm text-destructive-content/90"
              >
                {error}
              </p>
            )}
            <p className="mt-3 text-sm text-neutral-content/60">
              No spam. Unsubscribe whenever you like.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
