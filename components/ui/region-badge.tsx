import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface RegionBadgeProps {
  region: string
  className?: string
}

export function RegionBadge({ region, className }: RegionBadgeProps) {
  return (
    <Badge variant="outline" className={`flex items-center gap-1 ${className}`}>
      <MapPin className="h-3 w-3" />
      {region}
    </Badge>
  )
}
