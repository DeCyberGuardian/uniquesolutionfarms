// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Leaf, Award, Heart, Target, Eye, Handshake } from "lucide-react";
import {
  getSiteConfig,
  getTeamData,
  generateOrganizationStructuredData,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Unique Solution Farms' mission to empower smallholder farmers while delivering 100% natural products across Ghana. Meet our team and discover our story.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About | Unique Solution Farms",
    description:
      "Empowering farmers and nourishing communities with 100% natural Ghanaian products. Meet the team and our story.",
    url: "https://uniquesolutionfarms.com/about",
  },
};

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();
  const teamData = await getTeamData();
  const structuredData = generateOrganizationStructuredData(siteConfig);

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui mb-4">
              Our Story
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Empowering Farmers, Nourishing Communities
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Since {siteConfig.company.founded}, Unique Solution Farms has been
              bridging the gap between Ghana&apos;s rich agricultural heritage and
              modern consumer needs—creating value for farmers and delivering
              natural goodness to families nationwide.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>200+ Farmer Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>6 Regions Served</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>100% Natural Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Unique Solution Farms is a proudly Ghanaian agribusiness
                  enterprise committed to transforming agriculture into a driver
                  of health, wealth, and sustainability. What began as a vision
                  to add value to local farming has grown into a dynamic company
                  specializing in crop cultivation, fruit production, and
                  agro-processing.
                </p>
                <p>
                  At the core of our business is the passion to deliver safe,
                  healthy, and high-quality products that meet the needs of
                  modern consumers while supporting local farmers and
                  strengthening the agricultural value chain. We grow and source
                  a wide variety of fruits—including pineapple, mango, prekese,
                  ginger, xylopia, cloves, banana, pawpaw, and watermelon—which
                  form the foundation of our flagship brand, Unifresh Fruit
                  Juice.
                </p>
                <p>
                  Unifresh Juices are 100% natural, pasteurized, and
                  preservative-free—crafted to provide the pure taste of
                  Ghana’s finest harvests. By processing fresh fruits into
                  premium beverages, we reduce post-harvest losses and create
                  value-added products that promote healthier lifestyles.
                </p>
                <p>
                  We see agriculture as more than farming; it is a complete
                  system of cultivation, processing, and distribution. Through
                  innovation and careful integration of modern practices with
                  local expertise, we ensure efficiency, quality, and
                  sustainability across all operations.
                </p>
                <p>
                  Beyond products, our work impacts people. We partner with
                  smallholder farmers, creating reliable market access and
                  providing opportunities that improve livelihoods and build
                  stronger rural communities. With every bottle of Unifresh, we
                  share not just natural refreshment but also a story of
                  empowerment and growth.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/farmers/Gallery31.jpg"
                  alt="Unique Solution Farms — farmers and natural products"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission, Vision &amp; Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guided by our commitment to sustainability, quality, and community
              empowerment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To produce 100% natural juices from locally grown fruits while
                  reducing waste, empowering farmers, and promoting eco-friendly
                  packaging for a healthier future.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="font-ui text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To be Ghana&apos;s leading agribusiness, setting the standard
                  for natural products while creating sustainable livelihoods for
                  farming communities across West Africa.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Quality, sustainability, transparency, and community
                  partnership guide everything we do—from farm to bottle.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals driving our mission to transform
              Ghana&apos;s agricultural landscape
            </p>
          </div>

          {/* Wider gaps; center cards; smaller image frames */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
            {teamData.team.map(
              (member: { name: string; role: string; bio: string; image?: string }) => (
                <Card
                  key={member.name}
                  className="text-center border-0 shadow-lg overflow-visible group rounded-2xl"
                >
                  <div className="relative aspect-square w-56 sm:w-64 lg:w-72 mx-auto rounded-xl overflow-hidden ring-1 ring-black/5">
                    <Image
                      src={
                        member.image ||
                        `/placeholder.svg?height=800&width=800&query=${encodeURIComponent(
                          member.name
                        )}%20portrait`
                      }
                      alt={member.name}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 288px"
                    />
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="font-ui text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto w-fit">
                      {member.role}
                    </Badge>
                  </CardHeader>

                  <CardContent className="pb-8">
                    <CardDescription className="text-base">
                      {member.bio}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you&apos;re a farmer looking to partner with us, a distributor
                interested in our products, or a consumer who values natural
                goodness, we&apos;d love to connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="font-ui text-lg px-8">
                  <Link href="/farmers">Partner with Us</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="font-ui text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
