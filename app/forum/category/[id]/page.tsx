"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Clock, Eye, MessageCircle, Pin, Plus, Search, SortAsc, ThumbsUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { ForumCategory, ForumTopic } from "@/types/forum"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState<ForumCategory | null>(null)
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const categoryId = params.id as string

  useEffect(() => {
    const fetchCategoryAndTopics = async () => {
      try {
        // In a real app, these would be separate API calls
        // const categoryResponse = await fetch(`/api/forum/categories/${categoryId}`)
        // const topicsResponse = await fetch(`/api/forum/categories/${categoryId}/topics`)

        // if (!categoryResponse.ok || !topicsResponse.ok) {
        //   throw new Error("Failed to fetch category data")
        // }

        // const categoryData = await categoryResponse.json()
        // const topicsData = await topicsResponse.json()

        // setCategory(categoryData)
        // setTopics(topicsData)

        // Mock data for now
        const mockCategories = {
          "1": {
            id: "1",
            name: "Navigation & Equipment",
            description: "Discuss navigation tools and equipment issues",
            icon: "Compass",
            color: "blue",
            topicsCount: 156,
            postsCount: 1245,
          },
          "2": {
            id: "2",
            name: "Regulations & Compliance",
            description: "Discuss maritime laws and regulatory compliance",
            icon: "FileText",
            color: "green",
            topicsCount: 98,
            postsCount: 876,
          },
          "3": {
            id: "3",
            name: "Safety & Wellbeing",
            description: "Discuss health issues and wellbeing at sea",
            icon: "Shield",
            color: "red",
            topicsCount: 124,
            postsCount: 1087,
          },
          "4": {
            id: "4",
            name: "Career Development",
            description: "Career advice and professional development for maritime professionals",
            icon: "Anchor",
            color: "purple",
            topicsCount: 87,
            postsCount: 654,
          },
          "5": {
            id: "5",
            name: "Technology & Innovation",
            description: "Discuss emerging technologies in the maritime industry",
            icon: "Ship",
            color: "cyan",
            topicsCount: 112,
            postsCount: 932,
          },
          "6": {
            id: "6",
            name: "General Discussion",
            description: "General maritime topics and community discussions",
            icon: "MessageCircle",
            color: "orange",
            topicsCount: 203,
            postsCount: 1876,
          },
        }

        setCategory(mockCategories[categoryId as keyof typeof mockCategories] || null)

        // Generate mock topics
        const mockTopics: ForumTopic[] = []
        const topicCount = Math.floor(Math.random() * 15) + 10 // 10-25 topics

        for (let i = 1; i <= topicCount; i++) {
          const isPinned = i <= 2 // First two topics are pinned
          const isLocked = i === 3 // Third topic is locked
          const repliesCount = Math.floor(Math.random() * 50) + 1
          const viewsCount = repliesCount * (Math.floor(Math.random() * 10) + 5)
          const likesCount = Math.floor(repliesCount / 2)

          // Random time between now and 30 days ago
          const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)

          // Random time between creation and now for last update
          const updatedAt = new Date(
            createdAt.getTime() + Math.floor(Math.random() * (Date.now() - createdAt.getTime())),
          )

          mockTopics.push({
            id: `${categoryId}-${i}`,
            title: getRandomTopicTitle(Number.parseInt(categoryId), i),
            author: {
              id: `user-${i}`,
              name: getRandomAuthorName(i),
              avatar: `/placeholder.svg?height=40&width=40&text=U${i}`,
            },
            createdAt,
            updatedAt,
            repliesCount,
            viewsCount,
            likesCount,
            isPinned,
            isLocked,
            lastReplyAuthor: {
              id: `user-${i + 10}`,
              name: getRandomAuthorName(i + 10),
              avatar: `/placeholder.svg?height=40&width=40&text=U${i + 10}`,
            },
          })
        }

        // Sort by pinned first, then by updated date
        mockTopics.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1
          return b.updatedAt.getTime() - a.updatedAt.getTime()
        })

        setTopics(mockTopics)
      } catch (error) {
        console.error("Error fetching category data:", error)
        toast({
          title: "Error",
          description: "Failed to load category data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryAndTopics()
  }, [categoryId, toast])

  const getRandomTopicTitle = (categoryId: number, index: number) => {
    const titles = {
      1: [
        // Navigation & Equipment
        "Best practices for night navigation in busy shipping lanes",
        "GPS vs. Traditional navigation methods: A comparison",
        "Troubleshooting common radar issues at sea",
        "Electronic Chart Display and Information System (ECDIS) tips and tricks",
        "Navigating in extreme weather conditions",
        "Compass calibration techniques for different vessel types",
        "Navigation equipment maintenance schedule recommendations",
        "Collision avoidance systems: A comprehensive review",
        "Navigating through restricted visibility",
        "Modern navigation tools every sailor should know about",
      ],
      2: [
        // Regulations & Compliance
        "Understanding the latest IMO regulations",
        "MARPOL compliance challenges and solutions",
        "Port State Control inspection preparation guide",
        "Maritime Labor Convention: Rights and responsibilities",
        "Ballast water management regulations explained",
        "Emission control areas: Compliance strategies",
        "Documentation requirements for international voyages",
        "Safety management systems: Best practices",
        "Understanding maritime sanctions and compliance",
        "Regulatory changes affecting seafarer certification",
      ],
      3: [
        // Safety & Wellbeing
        "Mental health resources for long voyages",
        "Nutrition strategies for optimal health at sea",
        "Managing fatigue during extended watches",
        "Emergency response drills: Beyond the minimum requirements",
        "Creating a positive safety culture onboard",
        "Physical fitness routines for limited space",
        "Dealing with isolation: Communication strategies",
        "Heat stress management in engine rooms",
        "First aid essentials for maritime emergencies",
        "Sleep optimization techniques for shift workers",
      ],
      4: [
        // Career Development
        "Certification pathways for deck officers",
        "From cadet to captain: Career progression strategies",
        "Interview preparation for maritime positions",
        "Building a competitive maritime resume",
        "Continuing education opportunities for seafarers",
        "Transitioning from sea to shore-based positions",
        "Networking in the maritime industry",
        "Salary negotiations for maritime professionals",
        "Specialized maritime roles and qualifications",
        "Mentorship programs in the shipping industry",
      ],
      5: [
        // Technology & Innovation
        "Autonomous vessel developments and implications",
        "Blockchain applications in maritime logistics",
        "AI and machine learning in maritime operations",
        "Digital twins for vessel performance optimization",
        "Alternative fuels and propulsion technologies",
        "IoT applications for vessel monitoring",
        "Cybersecurity challenges in modern vessels",
        "Augmented reality for maintenance and repairs",
        "3D printing for spare parts at sea",
        "Satellite communication advancements for vessels",
      ],
      6: [
        // General Discussion
        "Share your most memorable voyage",
        "Best ports to visit around the world",
        "Unusual maritime traditions from different regions",
        "Favorite maritime books and films",
        "Sustainable practices for everyday shipboard life",
        "Cultural exchange experiences during port calls",
        "Maritime photography tips and showcase",
        "Dealing with difficult crew dynamics",
        "Maintaining relationships while at sea",
        "Favorite galley recipes with limited ingredients",
      ],
    }

    const categoryTitles = titles[categoryId as keyof typeof titles] || titles[6]
    return categoryTitles[index % categoryTitles.length]
  }

  const getRandomAuthorName = (seed: number) => {
    const firstNames = [
      "James",
      "Sarah",
      "Michael",
      "Emma",
      "David",
      "Olivia",
      "John",
      "Sophia",
      "Robert",
      "Ava",
      "William",
      "Isabella",
      "Richard",
      "Mia",
      "Thomas",
      "Charlotte",
      "Joseph",
      "Amelia",
      "Charles",
      "Harper",
    ]
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
      "Miller",
      "Wilson",
      "Moore",
      "Taylor",
      "Anderson",
      "Thomas",
      "Jackson",
      "White",
      "Harris",
      "Martin",
      "Thompson",
      "Garcia",
      "Martinez",
      "Robinson",
    ]

    const firstName = firstNames[seed % firstNames.length]
    const lastName = lastNames[(seed * 3) % lastNames.length]

    return `${firstName} ${lastName}`
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

  const filteredTopics = topics.filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    // Always keep pinned topics at the top
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    // Then sort by the selected criteria
    switch (sortBy) {
      case "recent":
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime()
      case "most_replies":
        return b.repliesCount - a.repliesCount
      case "most_views":
        return b.viewsCount - a.viewsCount
      case "most_likes":
        return b.likesCount - a.likesCount
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime()
    }
  })

  if (!category && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The category you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/forum">Return to Forum</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-6">
          <Button variant="ghost" className="mb-2" asChild>
            <Link href="/forum">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Link>
          </Button>

          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 w-3/4 rounded bg-muted"></div>
              <div className="h-4 w-1/2 rounded bg-muted"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{category?.name}</h1>
              <p className="mt-2 text-muted-foreground">{category?.description}</p>
            </>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href={`/forum/new?category=${categoryId}`}>
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most_replies">Most Replies</SelectItem>
                <SelectItem value="most_views">Most Views</SelectItem>
                <SelectItem value="most_likes">Most Likes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 rounded bg-muted"></div>
                    <div className="h-4 w-1/2 rounded bg-muted"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-16 rounded bg-muted"></div>
                    <div className="h-8 w-16 rounded bg-muted"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTopics.length > 0 ? (
              sortedTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className={topic.isPinned ? "border-primary/50 bg-primary/5" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="hidden h-10 w-10 border sm:block">
                          <AvatarImage src={topic.author.avatar || "/placeholder.svg"} alt={topic.author.name} />
                          <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/forum/topic/${topic.id}`}
                              className="font-medium hover:text-primary hover:underline"
                            >
                              {topic.title}
                            </Link>
                            {topic.isPinned && (
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                <Pin className="mr-1 h-3 w-3" />
                                Pinned
                              </Badge>
                            )}
                            {topic.isLocked && (
                              <Badge variant="outline" className="bg-destructive/10 text-destructive">
                                Locked
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Started by <span className="font-medium">{topic.author.name}</span> •{" "}
                            {formatTimeAgo(topic.createdAt)}
                          </div>
                          {topic.lastReplyAuthor && (
                            <div className="text-xs text-muted-foreground">
                              Last reply by <span className="font-medium">{topic.lastReplyAuthor.name}</span> •{" "}
                              {formatTimeAgo(topic.updatedAt)}
                            </div>
                          )}
                        </div>
                        <div className="hidden flex-col items-end gap-1 text-sm sm:flex">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                            <span>{topic.repliesCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span>{topic.viewsCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <span>{topic.likesCount}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">No topics found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {searchQuery
                    ? "No topics match your search criteria. Try a different search term."
                    : "Be the first to start a discussion in this category!"}
                </p>
                <Button asChild>
                  <Link href={`/forum/new?category=${categoryId}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Topic
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}

        <Separator className="my-8" />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {!isLoading && (
              <>
                <span className="font-medium">{filteredTopics.length}</span> topics •{" "}
                <span className="font-medium">{category?.postsCount}</span> posts
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last updated {formatTimeAgo(new Date(Date.now() - 30 * 60 * 1000))}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
