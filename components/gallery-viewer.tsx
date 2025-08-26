"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryData, GalleryGroup, GalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { GalleryCarousel } from "@/components/gallery-carousel";

type ViewMode = "slider" | "grid";

export function GalleryViewer({ data }: { data: GalleryData }) {
  const groups = data.groups || [];
  const defaultGroup = groups.find((g) => g.id === "processing")?.id ?? groups[0]?.id ?? "";
  const [activeGroup, setActiveGroup] = useState<string>(defaultGroup);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewMode>("slider");

  const active: GalleryGroup | undefined = useMemo(
    () => groups.find((g) => g.id === activeGroup) || groups[0],
    [groups, activeGroup]
  );

  // Filter + de-dupe
  const items = useMemo(() => {
    if (!active) return [];
    const list = active.items ?? [];
    const q = query.trim().toLowerCase();

    const filtered = q
      ? list.filter((it) => {
          const text = [it.alt ?? "", ...(it.tags ?? [])].join(" ").toLowerCase();
          return text.includes(q);
        })
      : list;

    const seen = new Set<string>();
    return filtered.filter((it) => {
      const key = `${it.id}|${it.src}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [active, query]);

  return (
    <div className="space-y-8">
      {/* Filters + search + view toggle */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <Button
              key={g.id}
              variant={g.id === (active?.id ?? "") ? "default" : "outline"}
              onClick={() => setActiveGroup(g.id)}
              className="font-ui"
            >
              {g.name}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-sm text-muted-foreground">View:</div>
          <div className="inline-flex rounded-md border overflow-hidden">
            <button
              className={cn(
                "px-3 py-2 text-sm",
                view === "slider" ? "bg-primary text-primary-foreground" : "bg-background"
              )}
              onClick={() => setView("slider")}
            >
              Slider
            </button>
            <button
              className={cn(
                "px-3 py-2 text-sm border-l",
                view === "grid" ? "bg-primary text-primary-foreground" : "bg-background"
              )}
              onClick={() => setView("grid")}
            >
              Grid
            </button>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search (e.g., pineapple, retail)…"
            className="w-56 md:w-72 px-3 py-2 rounded-md border"
          />
        </div>
      </div>

      {/* Description */}
      {active?.description ? (
        <p className="text-muted-foreground">{active.description}</p>
      ) : null}

      {/* Main media area */}
      {view === "slider" ? (
        <GalleryCarousel
          items={items}
          aspect="4/3"
          autoPlayMs={5000}
          className="mx-auto"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <Card key={`${active?.id}-${it.id}-${idx}`} className="overflow-hidden group">
              <div className="relative aspect-square">
                {it.type === "image" ? (
                  <Image
                    src={it.src}
                    alt={it.alt || "Gallery image"}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={it.src}
                    poster={(it as any).poster}
                    muted
                    playsInline
                  />
                )}
              </div>
              {it.tags?.length ? (
                <div className="p-3 flex flex-wrap gap-2">
                  {it.tags.slice(0, 3).map((t) => (
                    <Badge key={`${it.id}-${t}`} variant="secondary" className="text-[11px]">
                      {t}
                    </Badge>
                  ))}
                  {it.tags.length > 3 ? <Badge variant="outline">+{it.tags.length - 3}</Badge> : null}
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
