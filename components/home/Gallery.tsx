import { FiMapPin } from 'react-icons/fi';
import { galleryItems } from '@/lib/gallery';

export default function Gallery() {
  return (
    <section className="page-shell py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-eyebrow">Moments that matter</span>
        <h2 className="section-title">Community service in action</h2>
        <p className="section-lead mx-auto">
          A look at the kind of events our neighbours organise, from cold winter
          mornings to green summer weekends.
        </p>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <li
            key={item.title}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12 text-white">
              <p className="font-display text-lg font-bold leading-tight">
                {item.title}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                <FiMapPin className="h-3.5 w-3.5" /> {item.place}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
