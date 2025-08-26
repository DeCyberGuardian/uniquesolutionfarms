// lib/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type {
  SiteConfig,
  TeamMember,
  ProductsData,
  BlogPost,
  Region,
  GalleryData,
  GalleryGroup,
  GalleryItem,
} from "@/types/content";

const contentDirectory = path.join(process.cwd(), "content");

/* ---------------- Generic JSON loader ---------------- */
export async function getContentData<T>(filename: string): Promise<T> {
  const filePath = path.join(contentDirectory, filename);
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Error reading content file ${filename}:`, error);
    throw new Error(`Failed to load content from ${filename}`);
  }
}

/* ---------------- Site configuration ---------------- */
export async function getSiteConfig(): Promise<SiteConfig> {
  return getContentData<SiteConfig>("site-config.json");
}

/* ---------------- Team data ---------------- */
export async function getTeamData(): Promise<{ team: TeamMember[] }> {
  return getContentData<{ team: TeamMember[] }>("team.json");
}

/* ---------------- Products data ---------------- */
export async function getProductsData(): Promise<ProductsData> {
  return getContentData<ProductsData>("products.json");
}

export async function getProduct(categoryId: string, productId: string) {
  try {
    const productsData = await getProductsData();
    const category = productsData.categories?.find((cat) => cat.id === categoryId);
    if (!category) return null;
    const product = category.products?.find((prod) => prod.id === productId);
    return product || null;
  } catch (error) {
    console.error(`Error getting product ${categoryId}/${productId}:`, error);
    return null;
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const productsData = await getProductsData();
    const category = productsData.categories?.find((cat) => cat.id === categoryId);
    return category?.products || [];
  } catch (error) {
    console.error(`Error getting products for category ${categoryId}:`, error);
    return [];
  }
}

/* ---------------- Gallery (grouped) ---------------- */
export async function getGalleryData(): Promise<GalleryData> {
  return getContentData<GalleryData>("gallery.json");
}

export async function getGalleryGroups(): Promise<GalleryGroup[]> {
  try {
    const data = await getGalleryData();
    return data.groups ?? [];
  } catch (error) {
    console.error("Error reading gallery groups:", error);
    return [];
  }
}

/** Flatten all items across groups (optionally limit count). */
export async function getGalleryItems(limit?: number): Promise<GalleryItem[]> {
  try {
    const data = await getGalleryData();
    const all = (data.groups ?? []).flatMap((g) => g.items ?? []) as GalleryItem[];
    return typeof limit === "number" ? all.slice(0, Math.max(0, limit)) : all;
  } catch (error) {
    console.error("Error reading gallery items:", error);
    return [];
  }
}

/* ---------------- Blog/MDX ---------------- */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Prefer JSON list if present
    const blogPosts = await getContentData<BlogPost[]>("blog-posts.json");
    return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    // Fallback to /content/blog/*.mdx
    const blogDirectory = path.join(contentDirectory, "blog");
    try {
      const filenames = fs.readdirSync(blogDirectory);
      const posts = filenames
        .filter((name) => name.endsWith(".mdx"))
        .map((filename) => {
          const filePath = path.join(blogDirectory, filename);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContents);
          return {
            slug: filename.replace(/\.mdx$/, ""),
            title: data.title,
            excerpt: data.excerpt || data.description,
            date: data.date || data.publishedAt,
            author: data.author,
            category: data.category,
            image: data.image,
            content,
          } as BlogPost;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return posts;
    } catch (mdxError) {
      console.error("Error reading blog posts:", mdxError);
      return [];
    }
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Try JSON index first
    const blogPosts = await getContentData<BlogPost[]>("blog-posts.json");
    const post = blogPosts.find((p) => p.slug === slug);
    if (post) {
      // If a matching MDX exists, load its content; otherwise fall back to excerpt
      const blogDirectory = path.join(contentDirectory, "blog");
      const filePath = path.join(blogDirectory, `${slug}.mdx`);
      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { content } = matter(fileContents);
        return { ...post, content };
      } catch {
        return { ...post, content: post.excerpt || "" };
      }
    }
  } catch (error) {
    // ignore; fall through to MDX fallback
    console.error(`Error reading blog-posts.json (optional):`, error);
  }

  // Fallback: direct MDX file
  const blogDirectory = path.join(contentDirectory, "blog");
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt || data.description,
      date: data.date || data.publishedAt,
      author: data.author,
      category: data.category,
      image: data.image,
      content,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/* ---------------- Regions data ---------------- */
export async function getRegionsData(): Promise<{ regions: Region[] }> {
  return getContentData<{ regions: Region[] }>("regions.json");
}

export async function getRegion(regionId: string): Promise<Region | null> {
  const regionsData = await getRegionsData();
  const region = regionsData.regions.find((r) => r.id === regionId);
  return region || null;
}

/* ---------------- SEO helpers ---------------- */
export function generateProductStructuredData(product: any, category: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Unifresh" },
    manufacturer: { "@type": "Organization", name: "Unique Solution Farms" },
    category: category.name,
    image: product.image,
  };
}

export function generateOrganizationStructuredData(siteConfig: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.name,
    description: siteConfig.company.description,
    url: "https://uniquesolutionfarms.com",
    logo: "https://uniquesolutionfarms.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phones[0],
      contactType: "customer service",
      email: siteConfig.contact.email,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.contact.address.country,
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
  };
}

/* ---------------- Regions convenience ---------------- */
export async function getRegions(): Promise<Region[]> {
  try {
    const regionsData = await getRegionsData();
    return regionsData.regions || [];
  } catch (error) {
    console.error("Error reading regions:", error);
    // Return a harmless fallback to prevent crashes
    return [
      {
        id: "greater-accra",
        name: "Greater Accra",
        description: "Main distribution hub",
        coverage: ["Accra", "Tema", "Kasoa"],
        distributors: [],
      },
    ];
  }
}
