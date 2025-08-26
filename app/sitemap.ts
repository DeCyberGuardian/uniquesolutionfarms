// app/sitemap.ts
import type { MetadataRoute } from "next"
import { getBlogPosts, getProductsData } from "@/lib/content"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uniquesolutionfarms.com"

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/distribution`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/quality`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/farmers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/wholesale`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  const productsData = await getProductsData()

  const productRoutes: MetadataRoute.Sitemap = []
  for (const category of productsData.categories) {
    productRoutes.push({
      url: `${baseUrl}/products/${category.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
    for (const product of category.products) {
      productRoutes.push({
        url: `${baseUrl}/products/${category.id}/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  const blogPosts = await getBlogPosts()
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}
