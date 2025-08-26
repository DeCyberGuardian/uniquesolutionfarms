import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Custom components for MDX content
const components = {
  // Typography
  h1: ({ children, ...props }: any) => (
    <h1 className="font-display text-4xl font-bold text-primary mb-6 mt-8" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="font-display text-3xl font-semibold text-foreground mb-4 mt-8" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="font-ui text-2xl font-semibold text-foreground mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="font-ui text-xl font-medium text-foreground mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Links and buttons
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http")
    return (
      <Link
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    )
  },

  // Images
  img: ({ src, alt, ...props }: any) => (
    <div className="my-8">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={800}
        height={400}
        className="rounded-2xl shadow-lg w-full h-auto"
        {...props}
      />
    </div>
  ),

  // Code blocks
  pre: ({ children, ...props }: any) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6" {...props}>
      {children}
    </blockquote>
  ),

  // Custom components
  Button: ({ children, variant = "default", ...props }: any) => (
    <Button variant={variant} className="font-ui" {...props}>
      {children}
    </Button>
  ),

  Card: ({ children, ...props }: any) => (
    <Card className="my-6" {...props}>
      {children}
    </Card>
  ),

  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,

  Badge: ({ children, variant = "default", ...props }: any) => (
    <Badge variant={variant} {...props}>
      {children}
    </Badge>
  ),

  // Callout component for important information
  Callout: ({ type = "info", children, ...props }: any) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      success: "bg-green-50 border-green-200 text-green-800",
      error: "bg-red-50 border-red-200 text-red-800",
    }

    return (
      <div className={`border-l-4 p-4 rounded-r-lg my-6 ${styles[type as keyof typeof styles]}`} {...props}>
        {children}
      </div>
    )
  },
}

export { components }
export const mdxComponents = components
