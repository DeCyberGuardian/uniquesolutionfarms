import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Users, TrendingUp, Handshake } from "lucide-react"
import { getRegions } from "@/lib/content"

export const metadata: Metadata = {
  title: "Distribution & Stockists | Unifresh - Find Our Products Near You",
  description:
    "Find Unifresh natural juices at stockists across Ghana. Join our distribution network and bring healthy, natural beverages to your community.",
  keywords: "Unifresh stockists, distributors, Ghana juice retailers, become distributor, wholesale",
}

export default async function DistributionPage() {
  const regions = await getRegions()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lemon-50 to-lemon-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Find Unifresh Near You</h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Discover our network of trusted stockists across Ghana or join our growing family of distributors bringing
              natural goodness to communities nationwide.
            </p>
          
          </div>
        </div>
      </section>

      {/* Regional Coverage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Available Across Ghana</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our products are available in major cities and towns across all regions of Ghana through our network of
              trusted stockists.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {regions.map((region) => (
              <Card key={region.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{region.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{region.coverage?.join(", ") || "Multiple locations"}</p>
                  <Badge variant="secondary" className="bg-lemon-100 text-lemon-800">
                    {region.distributors?.length || 0} Stockists
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact for Stockist Info */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Need Help Finding a Stockist?</h3>
            <p className="text-gray-600 mb-6">
              Contact our team for specific stockist locations in your area or to report stockist issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call +233 24 186 1342
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Distributor */}
      <section className="py-16 bg-lemon-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Join Our Distribution Network</h2>
              <p className="text-lg text-gray-600">
                Partner with Unifresh to bring natural, healthy beverages to your community while building a profitable
                business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-lemon-600 mx-auto mb-4" />
                  <CardTitle>Growing Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Join Ghana's fastest-growing natural beverage market with proven consumer demand.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-lemon-600 mx-auto mb-4" />
                  <CardTitle>Full Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive comprehensive training, marketing materials, and ongoing business support.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Handshake className="h-12 w-12 text-lemon-600 mx-auto mb-4" />
                  <CardTitle>Fair Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Competitive margins, flexible terms, and exclusive territory protection for serious partners.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Distributor Requirements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Distributor Requirements</CardTitle>
                <CardDescription>
                  We're looking for committed partners who share our vision of bringing natural goodness to Ghana.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Business Requirements</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Valid business registration</li>
                      <li>• Minimum storage capacity (500+ cases)</li>
                      <li>• Refrigerated transport capability</li>
                      <li>• Established retail network</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Investment & Commitment</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Initial stock investment: GHS 10,000+</li>
                      <li>• 2-year partnership agreement</li>
                      <li>• Monthly minimum orders</li>
                      <li>• Marketing participation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
