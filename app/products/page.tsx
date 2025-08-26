import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/ui/product-card"
import { ArrowRight, Leaf, Award, Heart } from "lucide-react"
import { getProductsData } from "@/lib/content"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Discover our range of 100% natural Unifresh juices, fresh mushrooms, and traditional prekese powder. All natural, preservative-free, and made in Ghana.",
}

export default async function ProductsPage() {
  const productsData = await getProductsData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui mb-4">100% Natural Products</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Our Product Range</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From refreshing natural juices to farm-fresh mushrooms and traditional spices, discover the full range of
              Unifresh products crafted with care from Ghana's finest ingredients.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Leaf className="h-5 w-5 text-primary" />
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-primary" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="h-5 w-5 text-primary" />
                <span>Farmer Empowered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {productsData.categories.map((category, index) => (
              <div key={category.id} className="space-y-8">
                {/* Category Header */}
                <div className="text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{category.name}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">{category.description}</p>
                  <Button asChild variant="outline" className="font-ui bg-transparent">
                    <Link href={`/products/${category.id}`}>
                      View All {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} categoryId={category.id} />
                  ))}
                </div>

                {/* Divider */}
                {index < productsData.categories.length - 1 && <div className="border-t border-border/50 pt-8"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Interested in Wholesale?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Stock Unifresh products in your store, restaurant, or hotel. Get competitive wholesale pricing and
                reliable delivery across Ghana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="font-ui text-lg px-8">
                  <Link href="/wholesale">Get Wholesale Pricing</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="font-ui text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/contact">Contact Sales Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
