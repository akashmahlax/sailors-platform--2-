"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Activity, BarChart3, Flag, Headphones, Home, MessageCircle, Settings, Shield, Ship, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChart3,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Content Moderation",
      href: "/admin/moderation",
      icon: Shield,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: Flag,
      badge: 12,
    },
    {
      title: "Podcasts",
      href: "/admin/podcasts",
      icon: Headphones,
    },
    {
      title: "Forum Management",
      href: "/admin/forum",
      icon: MessageCircle,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: Activity,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Ship className="h-6 w-6 text-primary" />
            </motion.div>
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3 py-2">
          <div className="flex flex-col gap-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn("justify-start", pathname === route.href && "bg-secondary")}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.title}
                  {route.badge && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {route.badge}
                    </span>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
          <Button className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Platform
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
