import type { Metadata } from "next";
import EventsExplorer from "@/components/EventsExplorer";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Browse upcoming community service events and join the ones you care about.",
};

export default function EventsPage() {
  return (
    <div className="page-shell py-14 md:py-16">
      <header className="mb-10 max-w-2xl">
        <span className="section-eyebrow">Find your cause</span>
        <h1 className="section-title">Upcoming events</h1>
        <p className="section-lead">
          Every event here is still ahead of us. Open one to see the details and join in.
        </p>
      </header>
      <EventsExplorer />
    </div>
  );
}
