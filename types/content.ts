export interface SiteConfig {
  company: {
    name: string
    tagline: string
    description: string
    mission: string
    founded: string
    headquarters: string
  }
  contact: {
    email: string
    phones: string[]
    whatsapp: string
    address: {
      street: string
      city: string
      region: string
      country: string
    }
  }
  social: {
    instagram: string
    facebook: string
    tiktok: string
    linkedin: string
  }
  distributionRegions: string[]
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface Product {
  id: string
  name: string
  description: string
  ingredients?: string[]
  sizes?: string[]
  varieties?: string[]
  uses?: string[]
  benefits: string[]
  image: string
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  products: Product[]
}

export interface ProductsData {
  categories: ProductCategory[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image?: string
  content: string
  featured?: boolean
}

export interface Distributor {
  name: string
  contact: string
  address: string
  products: string[]
}

export interface Region {
  id: string
  name: string
  description: string
  coverage: string[]
  distributors: Distributor[]
}

export type GalleryItem =
  | { id: string; type: "image"; src: string; alt?: string; w?: number; h?: number; tags?: string[] }
  | { id: string; type: "video"; src: string; poster?: string; alt?: string; tags?: string[] };

export type GalleryGroup = {
  id: string;
  name: string;
  description?: string;
  items: GalleryItem[];
};

export type GalleryData = {
  groups: GalleryGroup[];
};
