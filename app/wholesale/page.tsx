// app/wholesale/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, ArrowLeft } from "lucide-react";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Wholesale & Distributors",
  description:
    "Partner with Unique Solution Farms to distribute Unifresh juices, fresh mushrooms, and prekese products across Ghana and beyond.",
  alternates: { canonical: "/wholesale" },
  openGraph: {
    type: "website",
    title: "Wholesale & Distributors | Unique Solution Farms",
    description:
      "Partner with us to distribute Unifresh juices, fresh mushrooms, and traditional prekese products.",
    url: "https://uniquesolutionfarms.com/wholesale",
  },
};

const SITE_URL = "https://uniquesolutionfarms.com";

const products = [
  {
    name: "Unifresh Pineapple Ginger",
    img: "/products/Gallery27.jpg", // place file at public/products/unifresh-pine-ginger.jpg
    alt: "Unifresh Pineapple Ginger bottle and packaging",
    points: ["Cartons: 10+ (customizable)", "High turnover in retail", "Chilled-ready distribution"],
  },
  {
    name: "Unifresh Cocktail",
    img: "/farmers/Gallery35.jpg", // public/products/unifresh-cocktail.jpg
    alt: "Unifresh Cocktail assorted fruit blend",
    points: ["Cartons: 10+ (customizable)", "POS support on request", "Great for supermarkets & events"],
  },
  {
    name: "Fresh Oyster Mushrooms",
    img: "/farmers/Gallery14.jpg", // public/products/fresh-oyster-mushrooms.jpg
    alt: "Fresh oyster mushrooms in crates",
    points: ["Weekly delivery schedule", "Cold-chain friendly", "Bulk pricing available"],
  },
  {
    name: "Prekese Powder",
    img: "/farmers/Gallery15.jpg", // public/products/prekese-powder.jpg
    alt: "Prekese powder sealed packs",
    points: ["Bulk packs available", "Consistent quality", "Export enquiries welcome"],
  },
];

export default function WholesalePage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb JSON-LD */}
      <StructuredData
        type="breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Wholesale", item: `${SITE_URL}/wholesale` },
          ],
        }}
      />

      {/* Header / Hero */}
      <section className="py-10 border-b">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui">Partner With Us</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
              Become a Distributor
            </h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
              Join our nationwide network distributing 100% natural Ghanaian products: Unifresh juices,
              farm-fresh mushrooms, and traditional prekese powder.
            </p>
            <div className="mt-6">
              <Button variant="ghost" asChild className="font-ui hidden md:inline-flex">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero image (replace file if you use a different name/path) */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border">
            <Image
              src="/banners/wholesale-hero.jpg" // public/banners/wholesale-hero.jpg
              alt="Distributor loading Unifresh products for delivery"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Left: Value + Logistics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-ui text-2xl">Why Partner with Unique Solution Farms?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <ul className="grid md:grid-cols-2 gap-3 list-disc pl-5">
                <li>Reliable, consistent supply from our farmer network</li>
                <li>HACCP-aligned processing and quality assurance</li>
                <li>High-demand natural products with clear positioning</li>
                <li>Marketing support and POS materials on request</li>
              </ul>

              {/* Product Showcase */}
              <div className="grid sm:grid-cols-2 gap-5">
                {products.map((p) => (
                  <Card key={p.name} className="overflow-hidden">
                    <div className="relative w-full h-44">
                      <Image
                        src={p.img}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="font-ui text-xl">{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="list-disc pl-5 space-y-1">
                        {p.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-ui text-xl">Minimum Order Quantities (MOQs)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Unifresh Juices: 10+ cartons (customizable)</li>
                      <li>Fresh Mushrooms: weekly schedule</li>
                      <li>Prekese Powder: bulk packs available</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-ui text-xl">Delivery & Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Greater Accra and major cities nationwide</li>
                      <li>Door-to-door and pickup options</li>
                      <li>Export enquiries welcome</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Right: CTA */}
          <Card>
            <CardHeader>
              <CardTitle className="font-ui text-2xl">Get Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild size="lg" className="w-full font-ui">
                <a
                  href="https://wa.me/233241861342?text=Hello!%20I'd%20like%20to%20become%20a%20Unifresh%20distributor."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full font-ui">
                <a href="mailto:Unifreshsolutionfarms@gmail.com?subject=Wholesale%20Enquiry">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </a>
              </Button>

              <Button asChild variant="secondary" size="lg" className="w-full font-ui">
                <Link href="/contact">Contact Form</Link>
              </Button>

              <p className="text-sm text-muted-foreground">
                Office: Mon–Fri, 9:00–17:00 GMT. We’ll reply within 1 business day.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
