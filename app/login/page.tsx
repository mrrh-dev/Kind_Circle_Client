import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import { PageSkeleton } from "@/components/Skeletons";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
