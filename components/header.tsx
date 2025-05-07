"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { motion } from "framer-motion"
import {
  Bell,
  Home,
  MessageSquare,
  Search,
  Ship,
  Upload,
  Headphones,
  TrendingUp,
  HelpCircle,
  FileText,
  MessageCircle,
  LogOut,
  Settings,
  User,
  Menu,
  X,
  PenTool,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useNotifications } from "@/components/notification-provider"
import NotificationDropdown from "@/components/notification-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session } = useSession()
  const { unreadCount } = useNotifications()
  const [messageCount, setMessageCount] = useState(7) // Mock message count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <header className={cn("sticky top-0 z-50 w-full maritime-header", isScrolled && "shadow-md")}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-ocean-600">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="maritime-sidebar w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Ship className="h-6 w-6 text-ocean-600" />
                  <span>Sailor's Platform</span>
                </Link>
                <div className="grid gap-2 pt-2">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-ocean-100",
                        pathname === item.href ? "bg-ocean-200 text-ocean-700" : "text-ocean-800",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="animate-float"
            >
              <Ship className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">Sailor's Platform</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-ocean-600"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Conditionally render notification components */}
          {session && (
            <>
              <NotificationDropdown>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-ocean-600">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-orange-500 p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </NotificationDropdown>

              <Button variant="ghost" size="icon" className="relative text-white hover:bg-ocean-600" asChild>
                <Link href="/messages">
                  <MessageSquare className="h-5 w-5" />
                  {messageCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-orange-500 p-0 text-xs">
                      {messageCount}
                    </Badge>
                  )}
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-ocean-600" asChild>
                <Link href="/create-post">
                  <PenTool className="h-5 w-5" />
                  <span className="sr-only">Create Post</span>
                </Link>
              </Button>
            </>
          )}

          <ThemeToggle />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-ocean-600">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage
                      src={session.user.image || "/placeholder.svg?height=32&width=32"}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback className="bg-ocean-200 text-ocean-700">
                      {session.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages" className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {/* Admin link - only visible to admins */}
                  {session.user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Ship className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className="text-white hover:bg-ocean-600" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className="border-t border-ocean-600 bg-ocean-700 py-2">
          <div className="container px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for topics, posts, or sailors..."
                className="pl-9 bg-white/10 border-ocean-600 placeholder:text-white/70 text-white"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 text-white hover:bg-ocean-600"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
