import type { Metadata } from "next";
import CreateEventClient from "@/components/CreateEventClient";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = { title: "Create Event" };

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventClient />
    </PrivateRoute>
  );
}
