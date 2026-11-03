import { Skeleton } from '@/components/ui/skeleton';

export function EventCardSkeleton() {
  return (
    <div
      className="surface-card flex h-full flex-col overflow-hidden"
      aria-hidden="true"
    >
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-auto h-11 w-full" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading events"
    >
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function RowSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
        >
          <Skeleton className="h-28 w-full shrink-0 sm:w-44" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="page-shell py-14" role="status" aria-label="Loading page">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-4 h-10 w-full max-w-md" />
      <Skeleton className="mt-3 h-5 w-full max-w-xl" />
      <div className="mt-10">
        <EventGridSkeleton count={3} />
      </div>
    </div>
  );
}
