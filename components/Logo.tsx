import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="19" cy="24" r="14" fill="var(--primary)" />
      <circle
        cx="29"
        cy="24"
        r="14"
        fill="var(--secondary)"
        fillOpacity="0.92"
      />
      <path
        d="M24 33c-6.5-4.4-7.5-8.6-5.2-11 1.8-1.8 4.4-1.3 5.2.7.8-2 3.4-2.5 5.2-.7 2.3 2.4 1.3 6.6-5.2 11Z"
        fill="var(--background)"
      />
    </svg>
  );
}

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${SITE_NAME} home`}
    >
      <LogoMark />
      <span className="font-display text-2xl font-bold tracking-tight text-foreground">
        {SITE_NAME}
      </span>
    </Link>
  );
}
