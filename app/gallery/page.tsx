// app/gallery/page.tsx
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { getGalleryData, getGalleryGroups } from "@/lib/content";
import { GalleryViewer } from "@/components/gallery-viewer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos & videos of our farms, processing, packaging and community moments.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const data = await getGalleryData();
  const groups = await getGalleryGroups();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 font-ui">Gallery</Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-4">Our Work in Pictures</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Explore crops, farmer partners, processing, packaging, retail displays, and more.
              </p>
            </div>
            {/* Quick group links */}
            <div className="flex gap-2">
              {groups.slice(0, 4).map((g) => (
                <Link key={g.id} href={`/gallery/${g.id}`} className="text-primary hover:underline">
                  #{g.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Viewer */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <GalleryViewer data={data} />
        </div>
      </section>
    </div>
  );
}
