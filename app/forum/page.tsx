"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Anchor,
  BookOpen,
  Compass,
  FileText,
  LifeBuoy,
  MessageCircle,
  Plus,
  Search,
  Shield,
  Ship,
  Users,
} from "lucide-react"
import type { ForumCategory } from "@/types/forum"

export default function ForumPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/forum/categories")
        if (!response.ok) throw new Error("Failed to fetch categories")

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching forum categories:", error)
        toast({
          title: "Error",
          description: "Failed to load forum categories. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    // For now, use mock data
    setCategories([
      {
        id: "1",
        name: "Navigation & Equipment",
        description: "Discuss navigation tools and equipment issues",
        icon: "Compass",
        color: "blue",
        topicsCount: 156,
        postsCount: 1245,
        latestTopics: [
          {
            id: "101",
            title: "GPS Calibration Issues",
            updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            repliesCount: 24,
          },
          {
            id: "102",
            title: "Radar Maintenance Tips",
            updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
            repliesCount: 18,
          },
        ],
      },
      {
        id: "2",
        name: "Regulations & Compliance",
        description: "Discuss maritime laws and regulatory compliance",
        icon: "FileText",
        color: "green",
        topicsCount: 98,
        postsCount: 876,
        latestTopics: [
          {
            id: "201",
            title: "IMO 2023 Regulations",
            updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            repliesCount: 32,
          },
          {
            id: "202",
            title: "Port State Control Inspections",
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            repliesCount: 15,
          },
        ],
      },
      {
        id: "3",
        name: "Safety & Wellbeing",
        description: "Discuss health issues and wellbeing at sea",
        icon: "Shield",
        color: "red",
        topicsCount: 124,
        postsCount: 1087,
        latestTopics: [
          {
            id: "301",
            title: "Mental Health Resources",
            updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
            repliesCount: 45,
          },
          {
            id: "302",
            title: "Nutrition at Sea",
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            repliesCount: 28,
          },
        ],
      },
      {
        id: "4",
        name: "Career Development",
        description: "Career advice and professional development for maritime professionals",
        icon: "Anchor",
        color: "purple",
        topicsCount: 87,
        postsCount: 654,
        latestTopics: [
          {
            id: "401",
            title: "Certification Pathways for Officers",
            updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
            repliesCount: 19,
          },
          {
            id: "402",
            title: "Interview Tips for Maritime Jobs",
            updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            repliesCount: 22,
          },
        ],
      },
      {
        id: "5",
        name: "Technology & Innovation",
        description: "Discuss emerging technologies in the maritime industry",
        icon: "Ship",
        color: "cyan",
        topicsCount: 112,
        postsCount: 932,
        latestTopics: [
          {
            id: "501",
            title: "Autonomous Vessel Developments",
            updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
            repliesCount: 37,
          },
          {
            id: "502",
            title: "Digital Logbooks and Compliance",
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            repliesCount: 14,
          },
        ],
      },
      {
        id: "6",
        name: "General Discussion",
        description: "General maritime topics and community discussions",
        icon: "MessageCircle",
        color: "orange",
        topicsCount: 203,
        postsCount: 1876,
        latestTopics: [
          {
            id: "601",
            title: "Share Your Most Memorable Voyage",
            updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            repliesCount: 52,
          },
          {
            id: "602",
            title: "Best Ports to Visit Around the World",
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            repliesCount: 64,
          },
        ],
      },
    ])
    setIsLoading(false)

    // Uncomment to fetch real data
    // fetchCategories()
  }, [toast])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="h-5 w-5" />
      case "FileText":
        return <FileText className="h-5 w-5" />
      case "Shield":
        return <Shield className="h-5 w-5" />
      case "Anchor":
        return <Anchor className="h-5 w-5" />
      case "Ship":
        return <Ship className="h-5 w-5" />
      case "MessageCircle":
        return <MessageCircle className="h-5 w-5" />
      case "Users":
        return <Users className="h-5 w-5" />
      case "BookOpen":
        return <BookOpen className="h-5 w-5" />
      case "LifeBuoy":
        return <LifeBuoy className="h-5 w-5" />
      default:
        return <MessageCircle className="h-5 w-5" />
    }
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600"
      case "green":
        return "text-green-600"
      case "red":
        return "text-red-600"
      case "purple":
        return "text-purple-600"
      case "cyan":
        return "text-cyan-600"
      case "orange":
        return "text-orange-600"
      default:
        return "text-primary"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Discussion Forum</h1>
            <p className="mt-2 text-muted-foreground">
              Connect with fellow maritime professionals and share your knowledge
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/forum/new">
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search forums..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted/50"></CardHeader>
              <CardContent className="h-32 space-y-2 py-4">
                <div className="h-4 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-1/2 rounded bg-muted"></div>
              </CardContent>
              <CardFooter className="h-12 bg-muted/30"></CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <div className={getColorClass(category.color)}>{getIconComponent(category.icon)}</div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Topics</span>
                      <span>{category.topicsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Posts</span>
                      <span>{category.postsCount}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {category.latestTopics.map((topic) => (
                      <Link key={topic.id} href={`/forum/topic/${topic.id}`}>
                        <div className="rounded-md bg-muted p-2 text-sm transition-colors hover:bg-muted/80">
                          <div className="font-medium">{topic.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Updated {formatTimeAgo(topic.updatedAt)} • {topic.repliesCount} replies
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/forum/category/${category.id}`}>View Category</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Active Discussions</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${i}`} alt="User" />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Link href={`/forum/topic/${100 + i}`} className="font-medium hover:underline">
                        {i === 1 && "Best practices for night navigation in busy shipping lanes"}
                        {i === 2 && "Experiences with new emission control regulations"}
                        {i === 3 && "Recommended safety equipment beyond regulatory requirements"}
                      </Link>
                      <Badge variant="outline" className="ml-2">
                        {i === 1 && "Navigation"}
                        {i === 2 && "Regulations"}
                        {i === 3 && "Safety"}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Started by{" "}
                      <span className="font-medium">
                        {i === 1 && "Captain James Wilson"}
                        {i === 2 && "Sarah Chen"}
                        {i === 3 && "Michael Rodriguez"}
                      </span>{" "}
                      • {i * 2} hours ago • {10 + i * 5} replies
                    </div>
                    <p className="mt-2 text-sm">
                      {i === 1 &&
                        "I've been navigating through the Singapore Strait recently and wanted to share some techniques that have worked well for maintaining situational awareness..."}
                      {i === 2 &&
                        "Our vessel recently implemented the new sulfur emission controls. We've had to adjust several operational procedures and I'd like to discuss the challenges..."}
                      {i === 3 &&
                        "Beyond the mandatory safety equipment, I've found several additional items to be invaluable during emergency situations. Would love to hear what others..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline">View More Discussions</Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Forum Statistics</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Users className="mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <MessageCircle className="mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">45,271</div>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <FileText className="mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">5,832</div>
              <p className="text-sm text-muted-foreground">Topics Created</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Ship className="mb-2 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">124</div>
              <p className="text-sm text-muted-foreground">Online Now</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
