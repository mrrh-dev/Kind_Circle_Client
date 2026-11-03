import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";
import { PageSkeleton } from "@/components/Skeletons";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RegisterForm />
    </Suspense>
  );
}
