"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

/**
 * Google login leaves the site and comes back, so the success toast is shown
 * here when the callback URL carries ?welcome=1.
 */
export default function WelcomeToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (params.get("welcome") !== "1") return;
    toast.success("Welcome to KindCircle! You are now logged in.");
    const next = new URLSearchParams(params.toString());
    next.delete("welcome");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [params, pathname, router]);

  return null;
}
