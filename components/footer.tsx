import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  products: [
    { name: "Unifresh Juices", href: "/products/juices" },
    { name: "Fresh Mushrooms", href: "/products/mushrooms" },
    { name: "Prekese Powder", href: "/products/prekese-powder" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Quality & Sustainability", href: "/quality" },
    { name: "Farmers & Partners", href: "/farmers" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Distribution", href: "/distribution" },
    { name: "Wholesale Inquiry", href: "/wholesale" },
    { name: "FAQ", href: "/faq" },
  ],
  regions: [
    { name: "Tamale", href: "/distribution/tamale" },
    { name: "Nsawam", href: "/distribution/nsawam" },
    { name: "Cape Coast", href: "/distribution/cape-coast" },
    { name: "Bolgatanga", href: "/distribution/bolgatanga" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-primary">Unique Solution Farms</div>
                <div className="text-sm text-muted-foreground font-ui">Natural Products</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              From Farm to Bottle: 100% Natural Ghanaian Goodness. Empowering smallholder farmers while delivering
              premium natural products across Ghana.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:Uniquesolutionfarms@gmail.com" className="hover:text-primary transition-colors">
                  Uniquesolutionfarms@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <div className="space-x-4">
                  <a href="tel:0241861342" className="hover:text-primary transition-colors">
                    0241861342
                  </a>
                  <a href="tel:0244829928" className="hover:text-primary transition-colors">
                    0244829928
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Ghana</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-ui font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-ui font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Regions */}
          <div>
            <h3 className="font-ui font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-ui font-medium text-foreground mb-3 text-sm">Distribution Regions</h4>
            <ul className="space-y-2">
              {footerLinks.regions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t mt-12 pt-8">
          <div className="max-w-md">
            <h3 className="font-ui font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news about our products and farmer partnerships.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button type="submit" className="font-ui">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Unique Solution Farms. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          asChild
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-green-500 hover:bg-green-600 text-white"
        >
          <a
            href="https://wa.me/233241861342?text=Hello%20Unique%20Solution%20Farms!%20I'm%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline font-ui">Order via WhatsApp</span>
          </a>
        </Button>
      </div>
    </footer>
  )
}
