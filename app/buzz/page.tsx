import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  MapPin,
  Ship,
  Anchor,
  Compass,
  Globe,
  Search,
  TrendingUp,
  Filter,
} from "lucide-react"

// Mock data for buzz posts
const buzzPosts = [
  {
    id: 1,
    author: "Captain Maria Rodriguez",
    authorRole: "Cargo Ship Captain",
    authorImage: "/placeholder.svg?height=50&width=50&text=MR",
    timeAgo: "2 hours ago",
    location: "Mediterranean Sea",
    content:
      "Just passed through the Strait of Gibraltar with perfect weather conditions. The sunrise over the Rock was absolutely breathtaking this morning! #MediterraneanCrossing #SailorLife",
    image: "/placeholder.svg?height=400&width=600&text=Gibraltar+Sunrise",
    likes: 124,
    comments: 18,
    shares: 7,
    saved: false,
    tags: ["Voyage", "Mediterranean"],
  },
  {
    id: 2,
    author: "Engineer James Chen",
    authorRole: "Marine Engineer",
    authorImage: "/placeholder.svg?height=50&width=50&text=JC",
    timeAgo: "5 hours ago",
    location: "Port of Singapore",
    content:
      "Completed the installation of our new eco-friendly propulsion system today. 30% more fuel efficient and significantly reduced emissions. Proud of our team's work! #MarineEngineering #GreenTech",
    image: "/placeholder.svg?height=400&width=600&text=Engine+Room",
    likes: 89,
    comments: 32,
    shares: 15,
    saved: true,
    tags: ["Technology", "Engineering"],
  },
  {
    id: 3,
    author: "Dr. Sarah Williams",
    authorRole: "Marine Biologist",
    authorImage: "/placeholder.svg?height=50&width=50&text=SW",
    timeAgo: "1 day ago",
    location: "Great Barrier Reef",
    content:
      "Observed remarkable coral recovery in sections where we implemented our restoration project last year. Nature's resilience never ceases to amaze me. #MarineConservation #CoralReef",
    image: "/placeholder.svg?height=400&width=600&text=Coral+Reef",
    likes: 215,
    comments: 42,
    shares: 28,
    saved: false,
    tags: ["Conservation", "Research"],
  },
  {
    id: 4,
    author: "First Mate Alex Johnson",
    authorRole: "Cruise Ship Officer",
    authorImage: "/placeholder.svg?height=50&width=50&text=AJ",
    timeAgo: "2 days ago",
    location: "Caribbean Sea",
    content:
      "Encountered a pod of dolphins during our voyage to St. Lucia today. They played in our bow wave for nearly 20 minutes! Moments like these remind me why I chose this career. #MarineLife #CruiseLife",
    image: "/placeholder.svg?height=400&width=600&text=Dolphins",
    likes: 178,
    comments: 24,
    shares: 12,
    saved: false,
    tags: ["Wildlife", "Caribbean"],
  },
  {
    id: 5,
    author: "Captain Hiroshi Tanaka",
    authorRole: "Container Ship Captain",
    authorImage: "/placeholder.svg?height=50&width=50&text=HT",
    timeAgo: "3 days ago",
    location: "Panama Canal",
    content:
      "Completing our 50th transit through the Panama Canal today. Still impressed by this engineering marvel every time. #PanamaCanal #Shipping",
    image: "/placeholder.svg?height=400&width=600&text=Panama+Canal",
    likes: 142,
    comments: 31,
    shares: 9,
    saved: true,
    tags: ["Shipping", "Navigation"],
  },
]

// Trending topics
const trendingTopics = [
  { name: "SustainableShipping", posts: 1243 },
  { name: "CrewWellbeing", posts: 876 },
  { name: "MaritimeTech", posts: 654 },
  { name: "NavigationTips", posts: 542 },
  { name: "SeaStories", posts: 421 },
]

// Suggested accounts
const suggestedAccounts = [
  {
    name: "Captain Emma Wilson",
    role: "Yacht Captain",
    image: "/placeholder.svg?height=40&width=40&text=EW",
  },
  {
    name: "Dr. Michael Lee",
    role: "Maritime Historian",
    image: "/placeholder.svg?height=40&width=40&text=ML",
  },
  {
    name: "Sofia Gonzalez",
    role: "Naval Architect",
    image: "/placeholder.svg?height=40&width=40&text=SG",
  },
]

export default function BuzzPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-ocean-800 md:text-4xl">Sailor's Buzz</h1>
          <p className="mt-2 text-muted-foreground">
            Connect with maritime professionals and share your experiences at sea
          </p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700">
          <Ship className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Post creation card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=40&width=40&text=You"
                    alt="Your profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <Input placeholder="Share your maritime experience..." className="bg-ocean-50" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="text-ocean-700">
                  <Globe className="mr-2 h-4 w-4" />
                  Location
                </Button>
                <Button variant="outline" size="sm" className="text-ocean-700">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Photo
                </Button>
                <Button variant="outline" size="sm" className="text-ocean-700">
                  <FileVideo className="mr-2 h-4 w-4" />
                  Video
                </Button>
                <Button variant="outline" size="sm" className="text-ocean-700">
                  <Tag className="mr-2 h-4 w-4" />
                  Tag
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feed tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Feed posts */}
          <div className="space-y-6">
            {buzzPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={post.authorImage || "/placeholder.svg"}
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ocean-800">{post.author}</h3>
                        <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.timeAgo}</span>
                          {post.location && (
                            <>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                {post.location}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="mb-4 whitespace-pre-wrap text-ocean-800">{post.content}</p>

                  {post.tags && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-ocean-50">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {post.image && (
                    <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
                      <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                    </div>
                  )}

                  <div className="flex justify-between">
                    <div className="flex gap-6">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                        <Heart
                          className={`h-4 w-4 ${post.saved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                        />
                        <span className="text-xs">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">{post.shares}</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${post.saved ? "text-ocean-600" : "text-muted-foreground"}`}
                    >
                      <Bookmark className={`h-4 w-4 ${post.saved ? "fill-ocean-600" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-ocean-50 px-6 py-3">
                  <div className="flex w-full items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src="/placeholder.svg?height=32&width=32&text=You"
                        alt="Your profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Input placeholder="Write a comment..." className="h-8 bg-white text-sm" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Send className="h-4 w-4 text-ocean-600" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="w-full">
              Load More
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search Sailor's Buzz" className="pl-9" />
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-ocean-800">Filters</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-ocean-600">
                  <Filter className="mr-1 h-3 w-3" />
                  Advanced
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-ocean-50 hover:bg-ocean-100">
                  #Voyages
                </Badge>
                <Badge variant="outline" className="bg-ocean-50 hover:bg-ocean-100">
                  #Technology
                </Badge>
                <Badge variant="outline" className="bg-ocean-50 hover:bg-ocean-100">
                  #Conservation
                </Badge>
                <Badge variant="outline" className="bg-ocean-50 hover:bg-ocean-100">
                  #CrewLife
                </Badge>
                <Badge variant="outline" className="bg-ocean-50 hover:bg-ocean-100">
                  #Navigation
                </Badge>
                <Badge variant="outline" className="bg-ocean-50 hover:bg-ocean-100">
                  #Training
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Trending topics */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-ocean-600" />
                <h3 className="font-semibold text-ocean-800">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <Link href={`/buzz/topic/${topic.name}`} className="text-sm hover:text-ocean-600">
                      #{topic.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full text-ocean-600">
                See More
              </Button>
            </CardContent>
          </Card>

          {/* Suggested accounts */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 font-semibold text-ocean-800">Suggested Accounts</h3>
              <div className="space-y-4">
                {suggestedAccounts.map((account) => (
                  <div key={account.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={account.image || "/placeholder.svg"}
                          alt={account.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ocean-800">{account.name}</p>
                        <p className="text-xs text-muted-foreground">{account.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maritime icons */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center rounded-lg bg-ocean-100 p-4 text-ocean-700">
              <Ship className="mb-2 h-8 w-8" />
              <span className="text-xs font-medium">Vessels</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-ocean-100 p-4 text-ocean-700">
              <Anchor className="mb-2 h-8 w-8" />
              <span className="text-xs font-medium">Ports</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-ocean-100 p-4 text-ocean-700">
              <Compass className="mb-2 h-8 w-8" />
              <span className="text-xs font-medium">Routes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import missing components
import { MoreHorizontal, Tag, Send, FileVideo, ImageIcon } from "lucide-react"
