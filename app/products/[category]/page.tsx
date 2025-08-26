// app/products/[category]/page.tsx
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/ui/product-card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getProductsData } from "@/lib/content"
import { StructuredData } from "@/components/seo/structured-data"

// ✅ Use your canonical content types (adjust the path if different)
import type {
  ProductsData,
  ProductCategory, // category type
  Product,         // product type (if you need it in maps)
} from "@/types/content"

export const revalidate = 3600 // ISR: re-generate every hour

type Params = { category: string }
interface CategoryPageProps {
  // Next 15 dynamic routes: params is a Promise
  params: Promise<Params>
}

const SITE_URL = "https://uniquesolutionfarms.com"

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const productsData = (await getProductsData()) as ProductsData
  const cat = productsData.categories.find((c) => c.id === category)

  if (!cat) {
    return {
      title: "Products",
      description: "Explore our natural juices, mushrooms, and prekese products.",
      openGraph: { type: "website", url: `${SITE_URL}/products` },
      alternates: { canonical: "/products" },
    }
  }

  return {
    title: cat.name,
    description: cat.description ?? "Explore our natural products.",
    openGraph: {
      type: "website",
      title: `${cat.name} | Unique Solution Farms`,
      description: cat.description ?? "Explore our natural products.",
      url: `${SITE_URL}/products/${cat.id}`,
    },
    alternates: { canonical: `/products/${cat.id}` },
  }
}

export async function generateStaticParams() {
  const productsData = (await getProductsData()) as ProductsData
  return productsData.categories.map((category) => ({ category: category.id }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const productsData = (await getProductsData()) as ProductsData

  // Narrow to a ProductCategory (type guard keeps TS happy)
  const cat = productsData.categories.find(
    (c): c is ProductCategory => c.id === category
  )

  if (!cat) {
    // Maybe the URL is a product slug: redirect to /products/:cat/:product if found
    for (const c of productsData.categories) {
      const product = c.products.find((p) => p.id === category)
      if (product) {
        redirect(`/products/${c.id}/${product.id}`)
      }
    }
    notFound()
  }

  const productCount = cat.products?.length ?? 0

  return (
    <div className="min-h-screen">
      {/* Breadcrumb JSON-LD (deterministic) */}
      <StructuredData
        type="breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
            { "@type": "ListItem", position: 3, name: cat.name, item: `${SITE_URL}/products/${cat.id}` },
          ],
        }}
      />

      {/* Breadcrumb */}
      <section className="py-8 border-b" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">{cat.name}</span>
          </div>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="ghost" asChild className="mb-6 font-ui">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Products
              </Link>
            </Button>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {cat.name}
            </h1>
            {cat.description ? (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {cat.description}
              </p>
            ) : null}
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui">
              {productCount} Product{productCount !== 1 ? "s" : ""} Available
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {productCount > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {cat.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} categoryId={cat.id} className="h-full" />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No products in this category yet. Check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Explore Other Categories</h2>
            <p className="text-lg text-muted-foreground">Discover more natural products from Unifresh</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.categories
              .filter((c) => c.id !== cat.id)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/products/${other.id}`}
                  className="group block p-6 bg-background rounded-2xl border hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-ui text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {other.name}
                  </h3>
                  {other.description ? (
                    <p className="text-muted-foreground mb-4 line-clamp-2">{other.description}</p>
                  ) : null}
                  <div className="flex items-center text-primary font-medium">
                    <span>View Products</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
