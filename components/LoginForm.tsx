"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { validateLogin, type LoginField } from "@/lib/validation";
import type { FieldErrors } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import AuthShell from "./AuthShell";
import Field from "./Field";
import GoogleButton from "./GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<LoginField>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const found = validateLogin({ email, password });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0] as string);
      return;
    }

    setLoading(true);
    const { data, error } = await signIn.email({ email: email.trim(), password });
    setLoading(false);

    if (error || !data) {
      const message =
        error?.status === 401 || error?.status === 400
          ? "Email or password is incorrect. Please check and try again."
          : error?.message || "We could not log you in. Please try again.";
      setErrors({ password: message });
      toast.error(message);
      return;
    }

    toast.success(`Welcome back, ${data.user.name}!`);
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to join events and manage the ones you host.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field label="Email" htmlFor="login-email" error={errors.email}>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((previous) => ({ ...previous, email: undefined }));
            }}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label="Password" htmlFor="login-password" error={errors.password}>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((previous) => ({ ...previous, password: undefined }));
              }}
              placeholder="Your password"
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
        </Field>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4 text-sm text-muted-foreground">
        <Separator className="flex-1" />
        or
        <Separator className="flex-1" />
      </div>
      <GoogleButton redirectTo={redirectTo} />

      <p className="mt-8 text-center text-foreground/70">
        New to KindCircle?{" "}
        <Link
          href={redirectTo === "/" ? "/register" : `/register?redirect=${encodeURIComponent(redirectTo)}`}
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
