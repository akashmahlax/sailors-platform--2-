"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, FileText, Upload, Headphones, TrendingUp, HelpCircle, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  const sidebarItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Sailor's Chronicles", href: "/chronicles", icon: FileText },
    { name: "Upload Center", href: "/upload", icon: Upload },
    { name: "Podcast Hub", href: "/podcasts", icon: Headphones },
    { name: "Sailor's Buzz", href: "/buzz", icon: TrendingUp },
    { name: "Support Forum", href: "/support", icon: HelpCircle },
    { name: "Maritime News", href: "/news", icon: FileText },
    { name: "Discussion Forum", href: "/forum", icon: MessageCircle },
  ]

  return (
    <div className="maritime-sidebar h-full w-64 border-r border-ocean-200 py-4">
      <div className="flex flex-col space-y-1 px-3">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-ocean-100 text-ocean-700"
                : "text-ocean-800 hover:bg-ocean-100 hover:text-ocean-700",
            )}
          >
            {pathname === item.href ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <item.icon className="h-5 w-5" />
              </motion.div>
            ) : (
              <item.icon className="h-5 w-5" />
            )}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
