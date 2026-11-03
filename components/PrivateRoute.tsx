'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { PageSkeleton } from './Skeletons';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const redirected = useRef(false);

  useEffect(() => {
    if (isPending || session || redirected.current) return;
    redirected.current = true;
    toast.error('Please log in to open that page.', { id: 'login-required' });
    router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isPending, session, router, pathname]);

  if (isPending || !session) return <PageSkeleton />;
  return <>{children}</>;
}
