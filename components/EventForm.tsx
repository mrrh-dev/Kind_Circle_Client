"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ApiError, type EventPayload } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";
import { minDateTimeLocal } from "@/lib/format";
import type { EventFormValues, FieldErrors } from "@/lib/types";
import { isHttpUrl, validateEventForm, type EventField } from "@/lib/validation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventImage from "./EventImage";
import Field from "./Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const emptyValues: EventFormValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

type Props = {
  initialValues?: EventFormValues;
  submitLabel: string;
  savingLabel: string;
  onSubmit: (payload: EventPayload) => Promise<void>;
  onCancel?: () => void;
  /** prefix for element ids so two forms never share an id */
  idPrefix?: string;
};

export default function EventForm({
  initialValues = emptyValues,
  submitLabel,
  savingLabel,
  onSubmit,
  onCancel,
  idPrefix = "event",
}: Props) {
  const [values, setValues] = useState<EventFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<EventField>>({});
  const [saving, setSaving] = useState(false);

  function update(field: EventField, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const found = validateEventForm(values);
    setErrors(found);
    const firstProblem = Object.entries(found)[0];
    if (firstProblem) {
      toast.error(firstProblem[1] as string);
      document.getElementById(`${idPrefix}-${firstProblem[0]}`)?.focus();
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        eventType: values.eventType,
        thumbnail: values.thumbnail.trim(),
        location: values.location.trim(),
        eventDate: new Date(values.eventDate).toISOString(),
      });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.fieldErrors) setErrors(error.fieldErrors as FieldErrors<EventField>);
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  const id = (field: EventField) => `${idPrefix}-${field}`;
  const cls = (field: EventField) => (errors[field] ? "input-error" : "");
  const thumbnailPreview = isHttpUrl(values.thumbnail.trim()) ? values.thumbnail.trim() : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Event title" htmlFor={id("title")} error={errors.title}>
        <Input
          id={id("title")}
          type="text"
          value={values.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="Winter Clothes Distribution, Mirpur 10"
          maxLength={100}
          aria-invalid={Boolean(errors.title)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Event type" htmlFor={id("eventType")} error={errors.eventType}>
          <Select value={values.eventType} onValueChange={(value) => update("eventType", value)}>
            <SelectTrigger id={id("eventType")} aria-invalid={Boolean(errors.eventType)}>
              <SelectValue placeholder="Choose a type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Date and time"
          htmlFor={id("eventDate")}
          error={errors.eventDate}
          hint="Must be in the future."
        >
          <Input
            id={id("eventDate")}
            type="datetime-local"
            value={values.eventDate}
            min={minDateTimeLocal()}
            onChange={(event) => update("eventDate", event.target.value)}
            aria-invalid={Boolean(errors.eventDate)}
          />
        </Field>
      </div>

      <Field label="Location" htmlFor={id("location")} error={errors.location}>
        <Input
          id={id("location")}
          type="text"
          value={values.location}
          onChange={(event) => update("location", event.target.value)}
          placeholder="Mirpur 10 Circle, Dhaka"
          maxLength={150}
          aria-invalid={Boolean(errors.location)}
        />
      </Field>

      <Field
        label="Thumbnail image URL"
        htmlFor={id("thumbnail")}
        error={errors.thumbnail}
        hint="Paste a link to a picture that shows your event."
      >
        <Input
          id={id("thumbnail")}
          type="url"
          value={values.thumbnail}
          onChange={(event) => update("thumbnail", event.target.value)}
          placeholder="https://example.com/event-photo.jpg"
          aria-invalid={Boolean(errors.thumbnail)}
        />
        {thumbnailPreview && (
          <div className="mt-3 aspect-[16/7] w-full max-w-sm overflow-hidden rounded-lg border border-border bg-muted">
            <EventImage key={thumbnailPreview} src={thumbnailPreview} alt="Thumbnail preview" />
          </div>
        )}
      </Field>

      <Field label="Description" htmlFor={id("description")} error={errors.description}>
        <Textarea
          id={id("description")}
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          rows={6}
          maxLength={2000}
          placeholder="What will happen, who is it for, and what should people bring?"
          aria-invalid={Boolean(errors.description)}
        />
        <p className="text-right text-xs text-muted-foreground">{values.description.length} / 2000</p>
      </Field>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" onClick={onCancel} disabled={saving} variant="outline">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={saving} size="lg">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? savingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
