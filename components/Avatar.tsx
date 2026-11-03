'use client';

import { useState } from 'react';
import { initials } from '@/lib/format';

type Props = {
  src?: string | null;
  name?: string | null;
  className?: string;
};

export default function Avatar({ src, name, className = 'h-10 w-10' }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground ${className}`}
        aria-label={name ?? 'User'}
      >
        {initials(name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name ? `${name} profile picture` : 'Profile picture'}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
