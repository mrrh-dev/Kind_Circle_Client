import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import RecentEvents from "@/components/home/RecentEvents";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <RecentEvents />
      <Gallery />
      <Newsletter />
    </>
  );
}
