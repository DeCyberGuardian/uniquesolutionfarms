import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Outfit, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/seo/structured-data"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" })
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" })

export const metadata: Metadata = {
  title: {
    default: "Unique Solution Farms | 100% Natural Ghanaian Juices & Fresh Produce",
    template: "%s | Unique Solution Farms",
  },
  description:
    "From Farm to Bottle: 100% Natural Ghanaian Goodness. Unifresh juices, fresh mushrooms, and prekese powder. Empowering smallholder farmers across Ghana.",
  keywords: [
    "Ghana agriculture",
    "natural juices",
    "Unifresh",
    "pineapple juice",
    "organic farming",
    "smallholder farmers",
    "agribusiness",
  ],
  authors: [{ name: "Unique Solution Farms" }],
  creator: "Unique Solution Farms",
  publisher: "Unique Solution Farms",
  metadataBase: new URL("https://uniquesolutionfarms.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://uniquesolutionfarms.com",
    siteName: "Unique Solution Farms",
    title: "Unique Solution Farms | 100% Natural Ghanaian Juices & Fresh Produce",
    description:
      "From Farm to Bottle: 100% Natural Ghanaian Goodness. Unifresh juices, fresh mushrooms, and prekese powder.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Unique Solution Farms - Natural Ghanaian Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Solution Farms | 100% Natural Ghanaian Juices",
    description: "From Farm to Bottle: 100% Natural Ghanaian Goodness",
    images: ["/og-image.jpg"],
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
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#84cc16",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        suppressHydrationWarning
        className={`font-sans antialiased ${inter.variable} ${outfit.variable} ${playfair.variable}`}
      >
        <StructuredData type="organization" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
