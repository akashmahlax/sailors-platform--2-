"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  FileText,
  ImageIcon,
  Video,
  Globe,
  Clock,
  Search,
  Plus,
  ChevronRight,
  Bookmark,
  Share2,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function NewsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newsItems, setNewsItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin
    if (session?.user?.role === "admin") {
      setIsAdmin(true)
    }

    // Fetch news items
    const fetchNews = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockNews = [
          {
            id: "1",
            title: "New IMO Regulations to Reduce Carbon Emissions",
            excerpt:
              "The International Maritime Organization has announced new regulations aimed at reducing carbon emissions from shipping by 40% by 2030.",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: {
              name: "Maritime News Team",
              image: "/placeholder.svg?height=40&width=40&text=MNT",
            },
            type: "article",
            category: "regulations",
            publishedAt: "2023-11-15T10:30:00Z",
            image: "/placeholder.svg?height=400&width=800&text=IMO+Regulations",
            comments: 24,
            shares: 56,
          },
          {
            id: "2",
            title: "Advanced Navigation Systems: A Visual Guide",
            excerpt:
              "Explore the latest advancements in maritime navigation technology with our comprehensive visual guide.",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: {
              name: "Tech Navigator",
              image: "/placeholder.svg?height=40&width=40&text=TN",
            },
            type: "video",
            category: "technology",
            publishedAt: "2023-11-10T14:45:00Z",
            image: "/placeholder.svg?height=400&width=800&text=Navigation+Systems",
            videoUrl: "#",
            comments: 18,
            shares: 42,
          },
          {
            id: "3",
            title: "Global Shipping Routes Disrupted by Severe Weather",
            excerpt:
              "Major shipping routes in the Pacific are experiencing significant disruptions due to unprecedented storm systems.",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: {
              name: "Weather Watch",
              image: "/placeholder.svg?height=40&width=40&text=WW",
            },
            type: "article",
            category: "weather",
            publishedAt: "2023-11-08T09:15:00Z",
            image: "/placeholder.svg?height=400&width=800&text=Shipping+Routes",
            comments: 32,
            shares: 78,
          },
          {
            id: "4",
            title: "Interview: Life as a Modern Ship Captain",
            excerpt:
              "Captain Sarah Johnson shares her experiences and challenges of commanding a container vessel in today's maritime industry.",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: {
              name: "Maritime Voices",
              image: "/placeholder.svg?height=40&width=40&text=MV",
            },
            type: "audio",
            category: "interviews",
            publishedAt: "2023-11-05T16:20:00Z",
            image: "/placeholder.svg?height=400&width=800&text=Ship+Captain",
            audioUrl: "#",
            comments: 15,
            shares: 29,
          },
          {
            id: "5",
            title: "Photo Essay: The World's Busiest Ports",
            excerpt: "A stunning visual journey through the ten busiest shipping ports around the globe.",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: {
              name: "Port Photographer",
              image: "/placeholder.svg?height=40&width=40&text=PP",
            },
            type: "gallery",
            category: "photography",
            publishedAt: "2023-11-01T11:00:00Z",
            image: "/placeholder.svg?height=400&width=800&text=Busy+Ports",
            comments: 27,
            shares: 64,
          },
        ]

        setNewsItems(mockNews)
      } catch (error) {
        console.error("Error fetching news:", error)
        toast({
          title: "Error",
          description: "Failed to load news items",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [session, toast])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "gallery":
        return <ImageIcon className="h-4 w-4" />
      case "audio":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredNews = newsItems.filter((item) => {
    // Filter by tab
    if (activeTab !== "all" && item.type !== activeTab && item.category !== activeTab) {
      return false
    }

    // Filter by search
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-ocean-800">Maritime News</h1>
          <p className="mt-2 text-muted-foreground">
            Stay updated with the latest news and developments in the maritime industry
          </p>
        </div>

        {isAdmin && (
          <Button className="bg-ocean-600 hover:bg-ocean-700" asChild>
            <Link href="/news/create">
              <Plus className="mr-2 h-4 w-4" />
              Publish News
            </Link>
          </Button>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="regulations">Regulations</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted"></div>
              <CardHeader>
                <div className="h-6 w-3/4 bg-muted"></div>
                <div className="h-4 w-full bg-muted"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-ocean-600">
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                      <Badge variant="outline" className="bg-black/30 text-white">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3" />
                    {formatDate(item.publishedAt)}
                    <Globe className="ml-2 h-3 w-3" />
                    Public
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={item.author.image || "/placeholder.svg"} alt={item.author.name} />
                      <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{item.author.name}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{item.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      <span>{item.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/news/${item.id}`}>
                        Read More
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-medium">No news found</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {searchQuery ? "No results match your search criteria" : "Check back later for updates"}
          </p>
          {searchQuery && (
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More News</Button>
      </div>
    </div>
  )
}
