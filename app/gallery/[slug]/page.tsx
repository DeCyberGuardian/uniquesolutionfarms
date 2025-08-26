// app/gallery/[group]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getGalleryData, getGalleryGroups } from "@/lib/content";
import type { GalleryData, GalleryGroup } from "@/types/content";
import { GalleryViewer } from "@/components/gallery-viewer";

type Params = { group: string };
interface GroupPageProps { params: Promise<Params> }

export async function generateStaticParams() {
  const groups = await getGalleryGroups();
  return groups.map((g) => ({ group: g.id }));
}

export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const { group } = await params;
  const groups = await getGalleryGroups();
  const g = groups.find((x) => x.id === group);
  if (!g) return { title: "Gallery", description: "Gallery group" };
  return {
    title: `${g.name} – Gallery`,
    description: g.description ?? `Photos and videos for ${g.name}.`,
    alternates: { canonical: `/gallery/${g.id}` },
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { group } = await params;
  const data = await getGalleryData();

  const g = data.groups.find((x) => x.id === group);
  if (!g) notFound();

  // Reorder so the requested group is first (GalleryViewer focuses the first group by default)
  const ordered: GalleryData = {
    groups: [g as GalleryGroup, ...data.groups.filter((x) => x.id !== group)],
  };

  return (
    <div className="min-h-screen">
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Link href="/gallery" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
          </Link>
          <div className="mt-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui">Gallery Group</Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-3">{g?.name}</h1>
            {g?.description ? <p className="text-muted-foreground mt-2 max-w-2xl">{g.description}</p> : null}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <GalleryViewer data={ordered} />
        </div>
      </section>
    </div>
  );
}
