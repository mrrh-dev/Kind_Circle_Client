"use client";

import { useEffect, useRef, useState } from "react";
import { FALLBACK_THUMBNAIL } from "@/lib/constants";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/** Event thumbnails are links pasted by users, so any of them can be broken */
export default function EventImage({ src, alt, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // A picture can fail to load before React attaches onError (server rendered
  // pages), so check once after mount as well.
  useEffect(() => {
    const image = ref.current;
    if (image && image.complete && image.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={failed ? FALLBACK_THUMBNAIL : src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
