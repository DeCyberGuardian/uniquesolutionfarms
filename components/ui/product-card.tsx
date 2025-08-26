import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/content"

interface ProductCardProps {
  product: Product
  categoryId: string
  className?: string
}

export function ProductCard({ product, categoryId, className }: ProductCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image || `/placeholder.svg?height=300&width=300&query=${product.name}`}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="font-ui text-lg">{product.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {product.benefits.slice(0, 2).map((benefit) => (
            <Badge key={benefit} variant="secondary" className="text-xs">
              {benefit}
            </Badge>
          ))}
        </div>
        <Button asChild variant="outline" className="w-full font-ui bg-transparent">
          <Link href={`/products/${categoryId}/${product.id}`}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
