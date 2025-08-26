"use client"

import { RegionBadge } from "@/components/ui/region-badge"

interface GhanaMapProps {
  regions: string[]
  className?: string
}

export function GhanaMap({ regions, className }: GhanaMapProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Simplified Ghana map SVG */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
        <div className="text-center mb-6">
          <h3 className="font-display text-2xl font-semibold text-primary mb-2">Distribution Across Ghana</h3>
          <p className="text-muted-foreground">Find Unifresh products in these regions</p>
        </div>

        {/* Map representation with regions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto">
          {regions.map((region) => (
            <RegionBadge key={region} region={region} className="justify-center" />
          ))}
        </div>

        {/* Ghana outline illustration */}
        <div className="mt-8 flex justify-center">
          <svg width="200" height="160" viewBox="0 0 200 160" className="text-primary/30" fill="currentColor">
            {/* Simplified Ghana country outline */}
            <path d="M50 40 L150 40 L160 60 L150 120 L140 140 L60 140 L40 120 L30 80 Z" />
            {/* Dots representing distribution points */}
            <circle cx="70" cy="60" r="3" className="text-primary" />
            <circle cx="120" cy="70" r="3" className="text-primary" />
            <circle cx="90" cy="90" r="3" className="text-primary" />
            <circle cx="130" cy="100" r="3" className="text-primary" />
            <circle cx="80" cy="110" r="3" className="text-primary" />
            <circle cx="110" cy="120" r="3" className="text-primary" />
          </svg>
        </div>
      </div>
    </div>
  )
}
