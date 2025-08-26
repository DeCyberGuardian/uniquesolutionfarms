// components/seo/structured-data.tsx
import { getSiteConfig, generateOrganizationStructuredData } from "@/lib/content"

type StructuredDataKind = "organization" | "product" | "article" | "breadcrumb"

interface StructuredDataProps {
  data?: Record<string, any>
  type?: StructuredDataKind
}

/** Safe JSON stringify that drops undefined & functions */
function safeStringify(value: unknown) {
  return JSON.stringify(
    value,
    (_k, v) => (typeof v === "function" || typeof v === "undefined" ? undefined : v),
  )
}

/**
 * Server component: emits deterministic JSON-LD.
 * - No Date.now / Math.random / window
 * - Use suppressHydrationWarning to avoid head-order diffs
 */
export async function StructuredData({ data, type = "organization" }: StructuredDataProps) {
  let structuredData = data

  if (type === "organization" && !data) {
    const siteConfig = await getSiteConfig()
    structuredData = generateOrganizationStructuredData(siteConfig)
  }

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeStringify(structuredData) }}
    />
  )
}

/** Product JSON-LD — pass stable fields only (no undefined) */
export function ProductStructuredData({
  product,
  category,
}: {
  product: {
    id: string
    name: string
    description?: string
    image?: string | string[]
    sku?: string
    gtin13?: string
    brandName?: string
    offers?: { price?: number; priceCurrency?: string; availability?: string }
  }
  category: { id: string; name: string }
}) {
  const image = Array.isArray(product.image) ? product.image : product.image ? [product.image] : []
  const offers = {
    "@type": "AggregateOffer",
    priceCurrency: product.offers?.priceCurrency ?? "GHS",
    availability: product.offers?.availability ?? "https://schema.org/InStock",
    ...(typeof product.offers?.price === "number" ? { lowPrice: product.offers.price } : {}),
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.description ? { description: product.description } : {}),
    ...(image.length ? { image } : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.gtin13 ? { gtin13: product.gtin13 } : {}),
    brand: {
      "@type": "Brand",
      name: product.brandName ?? "Unifresh",
    },
    category: category.name,
    manufacturer: {
      "@type": "Organization",
      name: "Unique Solution Farms",
      url: "https://uniquesolutionfarms.com",
    },
    offers,
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeStringify(structuredData) }}
    />
  )
}

/** Article JSON-LD */
export function ArticleStructuredData({
  post,
}: {
  post: {
    title: string
    excerpt?: string
    author?: string
    date: string
    image?: string | string[]
    slug: string
  }
}) {
  const images = Array.isArray(post.image) ? post.image : post.image ? [post.image] : []
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.author
      ? {
          author: {
            "@type": "Person",
            name: post.author,
          },
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "Unifresh",
      logo: {
        "@type": "ImageObject",
        url: "https://uniquesolutionfarms.com/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    ...(images.length ? { image: images } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://uniquesolutionfarms.com/blog/${post.slug}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeStringify(structuredData) }}
    />
  )
}
