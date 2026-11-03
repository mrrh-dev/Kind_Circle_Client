import type { Metadata } from "next";
import JoinedEventsClient from "@/components/JoinedEventsClient";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = { title: "Joined Events" };

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEventsClient />
    </PrivateRoute>
  );
}
