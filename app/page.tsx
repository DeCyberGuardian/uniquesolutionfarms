// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { GhanaMap } from "@/components/ghana-map";
import { ArrowRight, Leaf, Shield, Users, Heart, Truck, Award } from "lucide-react";
import { getSiteConfig, getProductsData } from "@/lib/content";
import { HeroSlider } from "@/components/hero-slider";

export const metadata: Metadata = {
  title: "Home",
  description:
    "From Farm to Bottle: 100% Natural Ghanaian Goodness. Discover Unifresh juices and fresh produce from Unique Solution Farms.",
};

export default async function HomePage() {
  const siteConfig = await getSiteConfig();
  const productsData = await getProductsData();

  const juiceCategory = productsData.categories.find((cat) => cat.id === "juices");
  const featuredProducts = juiceCategory?.products.slice(0, 4) || [];

  // Make sure these files exist under /public/banners/ (case-sensitive)
  const slides = [
    { id: "g30", type: "image" as const, src: "/banners/Gallery13.jpg", alt: "Unifresh juices assortment" },
    { id: "g31", type: "image" as const, src: "/banners/unifresh-juice.jpg", alt: "Fresh pineapples at the farm" },
    { id: "g32", type: "image" as const, src: "/banners/Gallery31.jpg", alt: "Bottling and packaging line" },
    { id: "g33", type: "image" as const, src: "/banners/Gallery27.jpg", alt: "Quality checks at the facility" },
    { id: "g34", type: "image" as const, src: "/banners/Gallery26.jpg", alt: "Packing finished Unifresh bottles" },
    { id: "g35", type: "image" as const, src: "/banners/Gallery18.jpg", alt: "Cold storage and logistics" },
    { id: "g36", type: "image" as const, src: "/banners/Gallery32.jpg", alt: "Showcase of Unifresh flavors" },
    { id: "g37", type: "image" as const, src: "/banners/Gallery30.jpg", alt: "Retail display of Unifresh" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 font-ui">
                  100% Natural • Preservative-Free
                </Badge>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  From Farm to{" "}
                  <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Bottle</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light">100% Natural Ghanaian Goodness</p>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Empowering smallholder farmers across Ghana while delivering premium natural juices,
                  fresh mushrooms, and traditional prekese powder to communities nationwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="font-ui text-lg px-8">
                  <Link href="/products">
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="font-ui text-lg px-8 bg-transparent">
                  <Link href="/distribution">Find a Stockist</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <HeroSlider slides={slides} intervalMs={4500} className="aspect-square" />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl p-4 shadow-lg">
                <Leaf className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg">
                <Shield className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Signature Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our range of 100% natural juices, each crafted with care from the finest Ghanaian fruits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} categoryId="juices" className="h-full" />
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="font-ui bg-transparent">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Unifresh */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Unifresh?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering natural goodness while supporting sustainable agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">100% Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  No artificial preservatives, colors, or flavors. Just pure, natural goodness from Ghana's finest fruits.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="font-ui text-xl">Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pasteurized for safety while maintaining nutritional value. HACCP-certified production processes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Farmer Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Direct partnerships with smallholder farmers, providing fair prices and sustainable livelihoods.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Distribution Map */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Available Across Ghana</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Find Unifresh products in major markets and stores across {siteConfig.distributionRegions.length} regions.
                We're committed to making natural goodness accessible to communities nationwide.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Fresh delivery to all regions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Trusted by local communities</span>
                </div>
              </div>
              <Button asChild size="lg" className="font-ui">
                <Link href="/distribution">
                  Find a Distributor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <GhanaMap regions={siteConfig.distributionRegions} />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Creating positive change in Ghana's agricultural sector, one partnership at a time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Farmer Partners</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">Regions Served</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-2">50%</div>
              <div className="text-muted-foreground">Waste Reduction</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="font-display text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Natural Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join our network of distributors and bring natural goodness to your community. Or contact us directly to
                learn more about our products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="font-ui text-lg px-8">
                  <Link href="/wholesale">Become a Distributor</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="font-ui text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
