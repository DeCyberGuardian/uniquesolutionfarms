"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Unifresh Juices", href: "/products/juices", description: "100% natural, preservative-free juices" },
      { name: "Fresh Mushrooms", href: "/products/mushrooms", description: "Farm-fresh, locally grown mushrooms" },
      {
        name: "Prekese Powder",
        href: "/products/prekese-powder",
        description: "Traditional Ghanaian spice and wellness",
      },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Distribution", href: "/distribution" },
  { name: "Quality", href: "/quality" },
  { name: "Farmers", href: "/farmers" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; description?: string }
>(({ className, title, children, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          {description ? (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
          ) : null}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {/* Top bar */}
      <div className="border-b bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="hidden md:flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden />
                <span className="truncate">Uniquesolutionfarms@gmail.com</span> 
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden />
                <span>0241861342</span>
              </div>
            </div>
            <div className="text-primary font-medium">
              From Farm to Bottle: 100% Natural Ghanaian Goodness
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" aria-label="Unique Solution Farms - Home">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-xl font-bold text-primary">Unique Solution Farms</div>
              <div className="text-xs text-muted-foreground font-ui">Natural Products</div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <NavigationMenu className="relative hidden lg:flex z-50">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "font-ui",
                          isActive(item.href) && "data-[state=open]:bg-accent/50"
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="z-50">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[560px] md:grid-cols-2 lg:w-[720px]">
                          {item.children.map((child) => (
                            <ListItem
                              key={child.name}
                              title={child.name}
                              href={child.href}
                              description={child.description}
                            />
                          ))}
                        </ul>
                        <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
                          <Link href="/products" className="hover:text-primary transition-colors">
                            Explore all products →
                          </Link>
                          <Link href="/wholesale" className="hover:text-primary transition-colors">
                            Become a distributor →
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} passHref legacyBehavior>
                      <NavigationMenuLink
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium font-ui",
                          "transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                          isActive(item.href) && "bg-accent/40"
                        )}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTAs (desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" asChild className="font-ui bg-transparent">
              <Link href="/distribution">Find a Stockist</Link>
            </Button>
            <Button asChild className="font-ui">
              <Link href="/wholesale">Become a Distributor</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav aria-label="Mobile">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors font-ui",
                          isActive(item.href) && "text-primary"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <div className="ml-4 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-3 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-6 space-y-3">
                  <Button variant="outline" asChild className="w-full font-ui bg-transparent">
                    <Link href="/distribution" onClick={() => setIsOpen(false)}>
                      Find a Stockist
                    </Link>
                  </Button>
                  <Button asChild className="w-full font-ui">
                    <Link href="/wholesale" onClick={() => setIsOpen(false)}>
                      Become a Distributor
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
