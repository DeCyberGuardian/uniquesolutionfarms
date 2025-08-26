import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Award, Leaf, Thermometer, Microscope, Truck, CheckCircle, Factory } from "lucide-react"

export const metadata: Metadata = {
  title: "Quality & Sustainability",
  description:
    "Learn about our HACCP-certified production processes, pasteurization methods, and commitment to sustainable packaging and eco-friendly practices.",
}

export default function QualityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui mb-4">Quality Assurance</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Quality & Sustainability
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From farm to bottle, we maintain the highest standards of quality, safety, and environmental
              responsibility in everything we do.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>HACCP Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>ISO Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Production Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every step carefully designed to preserve natural goodness while ensuring safety and quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-ui text-lg">Fresh Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Direct sourcing from partner farmers ensures the freshest, highest-quality fruits reach our facility
                  within hours of harvest.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <Microscope className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="font-ui text-lg">Quality Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Rigorous testing at multiple stages ensures every batch meets our strict quality and safety standards
                  before processing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Thermometer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-ui text-lg">Pasteurization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Gentle pasteurization process eliminates harmful bacteria while preserving natural vitamins, minerals,
                  and flavor.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                  <Factory className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="font-ui text-lg">Clean Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Sterile packaging in our HACCP-certified facility ensures product integrity from production to
                  consumption.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Certifications & Standards
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to quality is backed by internationally recognized certifications and rigorous adherence
                to food safety standards.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-ui font-semibold text-foreground mb-1">HACCP Certification</h3>
                    <p className="text-muted-foreground text-sm">
                      Hazard Analysis and Critical Control Points system ensures food safety at every production stage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-ui font-semibold text-foreground mb-1">ISO 22000 Standards</h3>
                    <p className="text-muted-foreground text-sm">
                      International food safety management system certification for consistent quality assurance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-ui font-semibold text-foreground mb-1">Ghana Standards Authority</h3>
                    <p className="text-muted-foreground text-sm">
                      Full compliance with national food safety and quality standards for local production.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="farmers/Gallery30.jpg"
                  alt="Quality control laboratory and testing facility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Practices */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sustainability Practices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Environmental responsibility is at the heart of our operations, from eco-friendly packaging to waste
              reduction initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Eco-Friendly Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Recyclable packaging materials and minimal plastic use reduce environmental impact while maintaining
                  product integrity.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Recyclable glass bottles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Biodegradable labels
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Minimal plastic use
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="font-ui text-xl">Waste Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Our processing methods maximize fruit utilization and minimize waste through innovative by-product
                  applications.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    50% waste reduction
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Pulp composting program
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Water recycling system
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Sustainable Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Direct partnerships with farmers promote sustainable agriculture practices and fair trade principles.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Organic farming support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Fair pricing guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Training programs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Experience the Quality Difference</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Taste the difference that comes from uncompromising quality standards and sustainable practices. Find
                Unifresh products near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="font-ui text-lg px-8">
                  <Link href="/products">View Our Products</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="font-ui text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/distribution">Find a Stockist</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
