import { FiCheckCircle } from "react-icons/fi";
import { LogoMark } from "./Logo";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const perks = [
  "Join a drive with one tap",
  "Host events for your own neighbourhood",
  "Keep track of everything you signed up for",
];

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="page-shell py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex rounded-2xl bg-background p-2 shadow-md">
              <LogoMark className="h-10 w-10" />
            </span>
            <h2 className="mt-8 font-display text-3xl font-bold leading-tight">
              Good things happen when neighbours show up.
            </h2>
            <ul className="mt-8 space-y-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-primary-foreground/90">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gallery/blanket-drive.svg"
            alt="Volunteers sharing blankets"
            className="relative mt-10 aspect-[16/10] w-full rounded-2xl border-4 border-white/30 object-cover"
          />
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-foreground/70">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
