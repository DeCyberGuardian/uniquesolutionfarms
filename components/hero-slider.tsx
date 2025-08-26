// components/hero-slider.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Slide =
  | { id: string; type: "image"; src: string; alt?: string }
  | { id: string; type: "video"; src: string; alt?: string }; // future-safe

export function HeroSlider({
  slides,
  intervalMs = 5000,
  className,
}: {
  slides: Slide[];
  intervalMs?: number;
  className?: string;
}) {
  const validSlides = useMemo(
    () => slides.filter((s) => !!s && !!s.id),
    [slides]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (validSlides.length < 2) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % validSlides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [validSlides.length, intervalMs]);

  if (validSlides.length === 0) {
    return (
      <div className={cn("relative w-full rounded-3xl bg-muted", className)} />
    );
  }

  return (
    <div className={cn("relative w-full rounded-3xl overflow-hidden shadow-2xl", className)}>
      {/* Slides */}
      <div className="relative h-full w-full" style={{ aspectRatio: "1 / 1" }}>
        {validSlides.map((s, i) => {
          const isActive = i === index;
          return (
            <div
              key={s.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={!isActive}
            >
              {s.type === "image" ? (
                <Image
                  src={s.src}
                  alt={s.alt || "Unifresh"}
                  fill
                  sizes="(min-width:1024px) 560px, 90vw"
                  className={cn(
                    "object-cover will-change-transform",
                    isActive && "kenburns"
                  )}
                  priority={i === 0}
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={s.src} />
                </video>
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      {validSlides.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {validSlides.map((s, i) => (
            <span
              key={`dot-${s.id}`}
              className={cn(
                "h-2 w-2 rounded-full bg-background/50 shadow",
                i === index ? "opacity-100" : "opacity-40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
