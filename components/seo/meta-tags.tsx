import type { Metadata } from "next"

interface OpenGraphMetaProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article" | "product"
}

export function generateOpenGraphMeta({
  title,
  description,
  image = "/og-image.jpg",
  url = "https://uniquesolutionfarms.com",
  type = "website",
}: OpenGraphMetaProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Unifresh - Natural Ghanaian Juices",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@unifresh_gh",
      site: "@unifresh_gh",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
