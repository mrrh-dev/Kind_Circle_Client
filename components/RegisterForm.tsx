"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FiCheck, FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import type { FieldErrors } from "@/lib/types";
import { passwordChecks, validateRegister, type RegisterField } from "@/lib/validation";
import { Separator } from "@/components/ui/separator";
import AuthShell from "./AuthShell";
import Field from "./Field";
import GoogleButton from "./GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));

  const [values, setValues] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<RegisterField>>({});
  const [loading, setLoading] = useState(false);

  const checks = passwordChecks(values.password);

  function update(field: RegisterField, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const found = validateRegister(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0] as string);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      image: values.photoURL.trim(),
    });
    setLoading(false);

    if (error) {
      const taken = /exist|already/i.test(error.message ?? "");
      const message = taken
        ? "An account with this email already exists. Try logging in instead."
        : error.message || "We could not create your account. Please try again.";
      if (taken) setErrors({ email: message });
      toast.error(message);
      return;
    }

    toast.success(`Account created. Welcome to KindCircle, ${values.name.trim()}!`);
    router.push(redirectTo);
    router.refresh();
  }

  const rules = [
    { ok: checks.upper, label: "One uppercase letter" },
    { ok: checks.lower, label: "One lowercase letter" },
    { ok: checks.length, label: "At least 6 characters" },
  ];

  return (
    <AuthShell title="Create your account" subtitle="It takes less than a minute. Then you can join or host events.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field label="Full name" htmlFor="register-name" error={errors.name}>
          <Input
            id="register-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field label="Email" htmlFor="register-email" error={errors.email}>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field
          label="Photo URL"
          htmlFor="register-photo"
          error={errors.photoURL}
          hint="Paste a link to a picture of you. It is shown in the navbar."
        >
          <Input
            id="register-photo"
            type="url"
            value={values.photoURL}
            onChange={(event) => update("photoURL", event.target.value)}
            placeholder="https://example.com/my-photo.jpg"
            aria-invalid={Boolean(errors.photoURL)}
          />
        </Field>

        <Field label="Password" htmlFor="register-password" error={errors.password}>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={values.password}
              onChange={(event) => update("password", event.target.value)}
              placeholder="Create a password"
              aria-invalid={Boolean(errors.password)}
              className="pr-12"
            />
            <Button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              variant="ghost" size="icon" className="size-8 rounded-full absolute right-2 top-1/2 -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
            </Button>
          </div>
          <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-3" aria-label="Password rules">
            {rules.map((rule) => (
              <li
                key={rule.label}
                className={`flex items-center gap-1.5 ${rule.ok ? "text-success" : "text-muted-foreground"}`}
              >
                {rule.ok ? <FiCheck className="h-4 w-4 shrink-0" /> : <FiX className="h-4 w-4 shrink-0" />}
                {rule.label}
              </li>
            ))}
          </ul>
        </Field>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4 text-sm text-muted-foreground">
        <Separator className="flex-1" />
        or
        <Separator className="flex-1" />
      </div>
      <GoogleButton redirectTo={redirectTo} />

      <p className="mt-8 text-center text-foreground/70">
        Already have an account?{" "}
        <Link
          href={redirectTo === "/" ? "/login" : `/login?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-semibold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
