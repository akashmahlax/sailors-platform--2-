"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Home,
  FileText,
  Upload,
  Headphones,
  HelpCircle,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Info,
  Ship,
  Rss,
  PenTool,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SidebarWithToggle() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update main content margin when sidebar state changes
  useEffect(() => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      if (isMobile) {
        mainContent.style.marginLeft = "0px"
      } else {
        mainContent.style.marginLeft = isCollapsed ? "64px" : "256px" // 16rem = 256px
      }
    }
  }, [isCollapsed, isMobile, isOpen])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  const sidebarItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Sailor's Chronicles", href: "/chronicles", icon: FileText },
    { name: "Sailor's Blog", href: "/blog", icon: PenTool },
    { name: "Upload Center", href: "/upload", icon: Upload },
    { name: "Podcast Hub", href: "/podcasts", icon: Headphones },
    { name: "Sailor's Buzz", href: "/buzz", icon: Rss },
    { name: "Support Forum", href: "/support", icon: HelpCircle },
    { name: "Maritime News", href: "/news", icon: FileText },
    { name: "Discussion Forum", href: "/forum", icon: MessageCircle },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "About Us", href: "/about", icon: Info },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />}

      {/* Toggle button for mobile */}
      {isMobile && !isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-20 z-50 rounded-full bg-ocean-600 text-white shadow-lg hover:bg-ocean-700"
          onClick={toggleSidebar}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "maritime-sidebar fixed bottom-0 left-0 top-16 z-40 flex flex-col border-r border-ocean-200 bg-ocean-50 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Toggle button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-4 z-50 h-6 w-6 rounded-full bg-ocean-600 text-white shadow-lg hover:bg-ocean-700"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>

          {/* Logo */}
          <div className={cn("flex items-center px-3 py-4", isCollapsed ? "justify-center" : "justify-start")}>
            <Ship className="h-8 w-8 text-ocean-600" />
            {!isCollapsed && <span className="ml-2 text-lg font-bold text-ocean-800">Sailor's Platform</span>}
          </div>

          {/* Navigation */}
          <div className="flex flex-col space-y-1 overflow-y-auto px-3 py-2">
            <TooltipProvider delayDuration={0}>
              {sidebarItems.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-ocean-100 text-ocean-700"
                          : "text-ocean-800 hover:bg-ocean-100 hover:text-ocean-700",
                        isCollapsed && "justify-center px-2",
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
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </>
  )
}
