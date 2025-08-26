// app/contact/page.tsx
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us | - Get in Touch",
  description:
    "Contact Unique Solution Farms for inquiries about our natural juices, distribution opportunities, or customer support. We're here to help.",
  keywords: "contact Unique Solution Farms, customer service, distribution inquiry, Ghana juice company",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lemon-50 to-lemon-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Have questions about our products, interested in distribution, or need customer support? We&apos;d love to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-lemon-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Head Office</h3>
                        <p className="text-gray-600">
                          Akuffokurom / Adoagyiri 371
                          <br />
                          Nsawam Adogyiri, Eastern Region
                          <br />
                          Ghana
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-lemon-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Phone Numbers</h3>
                        <p className="text-gray-600">
                          Main: +233 24 186 1342
                          <br />
                          Tel: +233 24 482 9928
                          <br />
                          WhatsApp: +233 24 186 1342
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-lemon-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Email Addresses</h3>
                        <p className="text-gray-600">
                          General: info@uniquesolutionfarms.com / Uniquesolutionfarms@gmail.com
                          <br />
                          Sales: sales@uniquesolutionfarms.com
                          <br />
                          Support: support@uniquesolutionfarms.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-lemon-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Forms */}
            <div className="lg:col-span-2">
              <div className="grid gap-8">
                {/* General Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-lemon-600" />
                      General Inquiry
                    </CardTitle>
                    <CardDescription>
                      Send us a message about our products, services, or any other questions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm kind="general" />

                    {/* Optional WhatsApp CTA for users who prefer chat */}
                    <Button asChild variant="outline" className="w-full mt-3">
                      <a
                        href="https://wa.me/233241861342?text=Hello%20Unifresh!%20I%27d%20like%20to%20make%20an%20enquiry."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Distribution Inquiry Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-lemon-600" />
                      Distribution Inquiry
                    </CardTitle>
                    <CardDescription>
                      Interested in becoming a distributor or stockist? Tell us about your business.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm kind="distribution" />

                    {/* Optional WhatsApp CTA */}
                    <Button asChild variant="outline" className="w-full mt-3">
                      <a
                        href="https://wa.me/233241861342?text=Hello%20Unifresh!%20I%27m%20interested%20in%20becoming%20a%20distributor."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Optional: Link to Wholesale page */}
                <div className="text-center">
                  <Button asChild>
                    <Link href="/wholesale">Become a Distributor</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
