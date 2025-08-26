"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

type Props = {
  items: GalleryItem[];
  aspect?: "16/9" | "4/3" | "1/1";
  autoPlayMs?: number | false;   // false to disable autoplay
  className?: string;
};

const aspectToClass: Record<NonNullable<Props["aspect"]>, string> = {
  "16/9": "aspect-video",
  "4/3" : "aspect-[4/3]",
  "1/1" : "aspect-square",
};

export function GalleryCarousel({
  items,
  aspect = "4/3",
  autoPlayMs = 5000,
  className,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const current = items[idx];

  // advance helpers
  const next = () => setIdx((p) => (p + 1) % Math.max(items.length, 1));
  const prev = () => setIdx((p) => (p - 1 + Math.max(items.length, 1)) % Math.max(items.length, 1));

  // autoplay (pauses on hover)
  useEffect(() => {
    if (!autoPlayMs || hover || items.length <= 1) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover, idx, items.length, autoPlayMs]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // make sure index stays valid when filter/search changes
  useEffect(() => {
    if (idx > items.length - 1) setIdx(0);
  }, [items.length, idx]);

  // basic fade transition by keying slide wrapper
  const slideKey = useMemo(() => `${current?.id}-${current?.src}-${idx}`, [current, idx]);

  return (
    <div
      className={cn("relative rounded-2xl overflow-hidden shadow-2xl bg-black", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={cn("relative w-full", aspectToClass[aspect])} key={slideKey}>
        {current ? (
          current.type === "image" ? (
            <Image
              src={current.src}
              alt={current.alt || "Gallery image"}
              fill
              className={cn(
                "object-cover md:object-contain",
                // use your Ken Burns global animation for images if you want
                "animate-kenburns"
              )}
              sizes="100vw"
              priority
            />
          ) : (
            <video
              className="h-full w-full object-contain bg-black"
              src={current.src}
              poster={(current as any).poster}
              controls
              autoPlay
              muted
              playsInline
            />
          )
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/70">No media</div>
        )}
      </div>

      {/* caption */}
      {current?.alt ? (
        <div className="absolute left-0 right-0 bottom-0 px-4 py-3 text-sm text-white bg-black/50 backdrop-blur">
          {current.alt}
        </div>
      ) : null}

      {/* arrows */}
      {items.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* dots */}
      {items.length > 1 && (
        <div className="absolute left-0 right-0 bottom-3 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition",
                i === idx ? "bg-white" : "bg-white/40 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
