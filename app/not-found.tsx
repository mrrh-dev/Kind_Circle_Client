import Link from 'next/link';
import { FiCompass } from 'react-icons/fi';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FiCompass className="h-10 w-10" />
      </span>
      <h1 className="section-title mt-6">We could not find that page</h1>
      <p className="section-lead mx-auto">
        The link may be old, or the event may have been removed by its
        organiser.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>
          Go home
        </Link>
        <Link href="/events" className={buttonVariants({ variant: 'brand' })}>
          Browse upcoming events
        </Link>
      </div>
    </div>
  );
}
