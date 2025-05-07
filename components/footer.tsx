"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Ship, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [mainContentMargin, setMainContentMargin] = useState("0px")

  useEffect(() => {
    // Function to update the footer width based on the main content margin
    const updateFooterWidth = () => {
      const mainContent = document.getElementById("main-content")
      if (mainContent) {
        const computedStyle = window.getComputedStyle(mainContent)
        setMainContentMargin(computedStyle.marginLeft)
      }
    }

    // Initial update
    updateFooterWidth()

    // Set up a mutation observer to watch for changes to the main content's style
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      const observer = new MutationObserver(updateFooterWidth)
      observer.observe(mainContent, { attributes: true, attributeFilter: ["style"] })

      // Clean up
      return () => observer.disconnect()
    }
  }, [])

  return (
    <footer
      className="border-t bg-ocean-50"
      style={{
        marginLeft: mainContentMargin,
        transition: "margin-left 0.3s ease-in-out",
      }}
    >
      <div className="container px-4 py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 rounded-xl bg-ocean-600 p-6 text-white md:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-2 text-2xl font-bold md:text-3xl">Stay Connected with Maritime Updates</h3>
            <p className="mb-6 text-ocean-100">
              Subscribe to our newsletter for the latest maritime news, resources, and community updates.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Your email address"
                className="border-ocean-400 bg-white/10 text-white placeholder:text-ocean-200"
              />
              <Button className="bg-white text-ocean-700 hover:bg-ocean-100">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Ship className="h-6 w-6 text-ocean-600" />
              </motion.div>
              <span className="font-bold text-ocean-800">Sailor's Platform</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting maritime professionals worldwide. Share experiences, knowledge, and support within the global
              seafaring community.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-ocean-600" />
                <span>contact@sailorsplatform.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-ocean-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-ocean-600" />
                <span>123 Harbor Way, Maritime City, MC 12345</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-ocean-800">Content</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/chronicles" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Sailor's Chronicles
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Maritime Blog
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Upload Center
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Podcast Hub
                </Link>
              </li>
              <li>
                <Link href="/buzz" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Sailor's Buzz
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-ocean-800">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Maritime News
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link href="/weather" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Weather Alerts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-ocean-800">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground transition-colors hover:text-ocean-600">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-ocean-200 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sailor's Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-ocean-600">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-ocean-600">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-ocean-600">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-ocean-600">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-ocean-600">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
