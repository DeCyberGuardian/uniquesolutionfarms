import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, Handshake, TrendingUp, Award, CheckCircle, Phone, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Farmers & Partners",
  description:
    "Join our network of smallholder farmers. Learn about our partnership program, fair pricing, training support, and how to become a Unique Solution Farms partner.",
}

const partnershipSteps = [
  {
    step: 1,
    title: "Initial Contact",
    description: "Reach out to our farmer relations team to express your interest in partnership.",
    icon: Phone,
  },
  {
    step: 2,
    title: "Farm Assessment",
    description: "Our team visits your farm to assess suitability and discuss partnership terms.",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Agreement Signing",
    description: "Formalize the partnership with clear terms for pricing, quality, and delivery.",
    icon: Handshake,
  },
  {
    step: 4,
    title: "Training & Support",
    description: "Receive training on best practices, quality standards, and sustainable farming methods.",
    icon: Award,
  },
  {
    step: 5,
    title: "Production & Delivery",
    description: "Begin regular production and delivery cycles with guaranteed market access.",
    icon: TrendingUp,
  },
]

const faqs = [
  {
    question: "What crops do you source from farmers?",
    answer:
      "We primarily source pineapples, oranges, mangoes, ginger, and prekese. We're always interested in discussing other tropical fruits and traditional ingredients that align with our product range.",
  },
  {
    question: "How do you determine pricing for farmer produce?",
    answer:
      "Our pricing is based on current market rates with a premium for quality and consistency. We guarantee fair prices that are typically 15-20% above local market rates for produce that meets our quality standards.",
  },
  {
    question: "What quality standards do farmers need to meet?",
    answer:
      "We require fresh, ripe produce free from pesticide residues and physical damage. Our team provides training on proper harvesting, handling, and storage techniques to help farmers meet these standards consistently.",
  },
  {
    question: "Do you provide support for organic farming practices?",
    answer:
      "Yes, we actively support farmers transitioning to organic practices through training programs, technical assistance, and premium pricing for certified organic produce.",
  },
  {
    question: "How often do you collect produce from farmers?",
    answer:
      "Collection schedules vary by crop and season, but typically range from weekly to bi-weekly. We work with farmers to establish predictable schedules that work for both parties.",
  },
  {
    question: "What support do you provide to new farmer partners?",
    answer:
      "New partners receive comprehensive training on quality standards, post-harvest handling, record keeping, and sustainable farming practices. We also provide ongoing technical support and market guidance.",
  },
]

export default function FarmersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-ui mb-4">Farmer Partnerships</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Growing Together with Ghana's Farmers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our network of 200+ smallholder farmers across 6 regions. Experience fair pricing, guaranteed market
              access, and comprehensive support for sustainable agriculture.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>200+ Active Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>15-20% Premium Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Training & Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner with Unique Solution Farms?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in creating mutually beneficial partnerships that support farmer livelihoods while ensuring
              consistent quality supply
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Fair & Premium Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Receive 15-20% above local market rates for quality produce with guaranteed payment terms and no
                  middleman markdowns.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Premium pricing guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Timely payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    No middleman fees
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="font-ui text-xl">Guaranteed Market Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Secure, long-term contracts provide market certainty and enable better farm planning and investment
                  decisions.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Long-term contracts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Predictable demand
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Regular collection
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-ui text-xl">Training & Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Comprehensive training programs and ongoing technical support help improve yields, quality, and
                  sustainable practices.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Best practice training
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Quality standards guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Sustainable farming methods
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Become a Partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our straightforward partnership process ensures a smooth onboarding experience for new farmer partners
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {partnershipSteps.map((step, index) => (
                <div key={step.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                            <step.icon className="h-5 w-5 text-accent-foreground" />
                          </div>
                          <CardTitle className="font-ui text-xl">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{step.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  {index < partnershipSteps.length - 1 && (
                    <div className="flex-shrink-0 w-16 flex justify-center">
                      <div className="w-px h-8 bg-border"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions from farmers interested in partnering with Unique Solution Farms
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6">
                  <AccordionTrigger className="font-ui text-left hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join our growing network of farmer partners and experience the benefits of working with Ghana's leading
                natural products company.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="font-ui text-lg px-8">
                  <Link href="/contact">
                    Contact Our Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="font-ui text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <a href="tel:0241861342">
                    <Phone className="mr-2 h-5 w-5" />
                    Call: 0241861342
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
