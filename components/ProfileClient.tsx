"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/token";
import type { FieldErrors } from "@/lib/types";
import { validateProfile, type ProfileField } from "@/lib/validation";
import Avatar from "./Avatar";
import Field from "./Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function ProfileClient() {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name ?? "");
  const [photoURL, setPhotoURL] = useState(user?.image ?? "");
  const [errors, setErrors] = useState<FieldErrors<ProfileField>>({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const found = validateProfile({ name, photoURL });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0] as string);
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: photoURL.trim() });
    setSaving(false);

    if (error) {
      toast.error(error.message || "We could not update your profile. Please try again.");
      return;
    }

    clearToken(); // the next API call gets a token with the new name and photo
    await refetch();
    toast.success("Profile updated. Looking good!");
  }

  if (!user) return null;

  return (
    <div className="page-shell py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <span className="section-eyebrow">Your account</span>
          <h1 className="section-title">My profile</h1>
          <p className="section-lead">Change the name and picture other people see on your events.</p>
        </header>

        <div className="surface-card grid gap-8 p-6 shadow-lg sm:p-8 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center gap-3 text-center md:w-48">
            <Avatar src={photoURL.trim() || user.image} name={name || user.name} className="h-28 w-28 text-3xl" />
            <div className="min-w-0 max-w-full">
              <p className="truncate font-display text-lg font-bold">{user.name}</p>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field label="Display name" htmlFor="profile-name" error={errors.name}>
              <Input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((previous) => ({ ...previous, name: undefined }));
                }}
                aria-invalid={Boolean(errors.name)}
              />
            </Field>

            <Field
              label="Photo URL"
              htmlFor="profile-photo"
              error={errors.photoURL}
              hint="The preview on the left updates as you type."
            >
              <Input
                id="profile-photo"
                type="url"
                value={photoURL}
                onChange={(event) => {
                  setPhotoURL(event.target.value);
                  setErrors((previous) => ({ ...previous, photoURL: undefined }));
                }}
                placeholder="https://example.com/my-photo.jpg"
                aria-invalid={Boolean(errors.photoURL)}
              />
            </Field>

            <Field label="Email" htmlFor="profile-email" hint="Your email is your login and cannot be changed here.">
              <Input id="profile-email" type="email" value={user.email} disabled className="input w-full" />
            </Field>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={saving} size="lg">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving..." : "Save profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
