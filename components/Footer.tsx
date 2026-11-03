import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { LogoMark } from "./Logo";
import { buttonVariants } from "@/components/ui/button";

const socials = [
  { label: "X (formerly Twitter)", href: "https://x.com", icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/joined-events", label: "Joined Events" },
];

const causes = ["Winter clothes drives", "Tree plantation", "Food distribution", "Blood donation camps", "Neighbourhood cleanups"];

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-neutral text-neutral-content">
      {/* Call to action card that overlaps the footer */}
      <div className="page-shell">
        <div className="relative -top-14 overflow-hidden rounded-2xl bg-primary px-6 py-10 text-primary-foreground shadow-xl sm:px-12">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Have a cause in your neighbourhood?</h2>
              <p className="mt-2 max-w-xl text-primary-foreground/85">
                Post your event in a minute and let people nearby sign up to help.
              </p>
            </div>
            <Link href="/create-event" className={buttonVariants({ variant: "secondary", size: "lg", className: "shrink-0" })}>
              Host an event <FiArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="page-shell -mt-4 grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-2xl font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-content/75">
            {SITE_TAGLINE} KindCircle connects neighbours with local social service events, from winter clothes
            distribution in Mirpur to blanket drives in Mohammadpur.
          </p>
          <ul className="mt-5 flex gap-2" aria-label="Social media">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">Quick links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-neutral-content/75 transition hover:text-secondary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">Causes we support</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-content/75">
            {causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-content/75">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              Mirpur 10, Dhaka 1216, Bangladesh
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              hello@kindcircle.example
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              +880 1700-000000
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col items-center justify-between gap-2 py-5 text-sm text-neutral-content/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Made for neighbourhoods that show up.</p>
          <p>Every event on this site was posted by a community member.</p>
        </div>
      </div>
    </footer>
  );
}
