'use client';

import Link from 'next/link';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { Button, buttonVariants } from '@/components/ui/button';

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/15 text-warning">
        <FiAlertTriangle className="h-10 w-10" />
      </span>
      <h1 className="section-title mt-6">Something went wrong</h1>
      <p className="section-lead mx-auto">
        We could not load this page. The server may be waking up, so please try
        again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset}>
          <FiRefreshCw className="h-4 w-4" /> Try again
        </Button>
        <Link href="/" className={buttonVariants({ variant: 'brand' })}>
          Go home
        </Link>
      </div>
    </div>
  );
}
