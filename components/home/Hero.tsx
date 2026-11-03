import Link from "next/link";
import { FiArrowRight, FiHeart, FiMapPin } from "react-icons/fi";
import { FaTree } from "react-icons/fa6";
import { LuShirt } from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="dot-grid pointer-events-none absolute inset-0 text-primary opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="page-shell relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="section-eyebrow">
            <FiHeart className="h-4 w-4" /> Community powered giving
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
            Your neighbourhood needs you <span className="text-primary">this weekend.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
            KindCircle helps you find, host and join social service events across Bangladesh. Hand out winter
            clothes in Mirpur, plant trees by the river, or serve a hot meal. Pick a cause, show up, and see the
            difference.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className={buttonVariants({ size: "lg" })}>
              Explore Upcoming Events <FiArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/create-event" className={buttonVariants({ variant: "brand", size: "lg" })}>
              Host an Event
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground/70">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Free to join
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" /> Posted by neighbours
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-coral" /> Only upcoming events shown
            </li>
          </ul>
        </div>

        {/* Collage of illustrations with floating labels */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-2xl border-4 border-background shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gallery/winter-clothes.svg"
                alt="Volunteers handing out winter clothes"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border-4 border-background shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gallery/tree-plantation.svg"
                alt="Neighbours planting a tree"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border-4 border-background shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gallery/food-distribution.svg"
                alt="Volunteers serving meals"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>

          <div className="floaty absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 shadow-lg sm:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-coral">
              <LuShirt className="h-5 w-5" />
            </span>
            <div className="text-sm">
              <p className="font-semibold">Winter clothes drive</p>
              <p className="flex items-center gap-1 text-muted-foreground">
                <FiMapPin className="h-3 w-3" /> Mirpur 10
              </p>
            </div>
          </div>

          <div
            className="floaty absolute -right-2 bottom-10 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 shadow-lg sm:-right-6"
            style={{ animationDelay: "1.5s" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-success">
              <FaTree className="h-5 w-5" />
            </span>
            <div className="text-sm">
              <p className="font-semibold">Plantation day</p>
              <p className="text-muted-foreground">Join with one tap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
