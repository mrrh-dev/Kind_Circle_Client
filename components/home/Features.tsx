import { FiCalendar, FiGrid, FiMapPin, FiUserCheck } from "react-icons/fi";

const features = [
  {
    icon: FiCalendar,
    title: "Host in a minute",
    text: "Add a title, place, date and photo. Your event goes live right away for the whole community to see.",
  },
  {
    icon: FiUserCheck,
    title: "Join with one tap",
    text: "Found something you care about? Press Join Event and you are on the list. No forms, no phone calls.",
  },
  {
    icon: FiMapPin,
    title: "Local by design",
    text: "Every event shows its exact location, so you can find a drive in Mirpur or Mohammadpur that is close to home.",
  },
  {
    icon: FiGrid,
    title: "Your own dashboard",
    text: "Edit or remove the events you host, and keep a tidy list of everything you have joined, sorted by date.",
  },
];

export default function Features() {
  return (
    <section className="page-shell py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-eyebrow">Why KindCircle</span>
        <h2 className="section-title">Everything a good deed needs, in one place</h2>
        <p className="section-lead mx-auto">
          We built KindCircle so organising a clothes drive is as easy as joining one.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="surface-card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-foreground/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
