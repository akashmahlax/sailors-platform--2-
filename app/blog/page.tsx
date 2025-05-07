import Link from "next/link"
import Image from "next/image"
import { PenTool, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "Navigating Through Stormy Waters: A Captain's Guide",
    excerpt:
      "Learn essential techniques for safely navigating your vessel through challenging weather conditions from an experienced captain.",
    author: "Captain James Wilson",
    authorImage: "/placeholder.svg?height=40&width=40&text=JW",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600&text=Storm+Navigation",
    tags: ["Navigation", "Safety", "Weather"],
    featured: true,
    category: "Seamanship",
  },
  {
    id: 2,
    title: "The Evolution of Maritime Communication Systems",
    excerpt:
      "Explore how maritime communication has evolved from signal flags to satellite systems and what the future holds.",
    author: "Dr. Sarah Chen",
    authorImage: "/placeholder.svg?height=40&width=40&text=SC",
    date: "April 28, 2023",
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=600&text=Maritime+Communication",
    tags: ["Technology", "Communication", "History"],
    featured: true,
    category: "Technology",
  },
  {
    id: 3,
    title: "Sustainable Fishing Practices for Modern Trawlers",
    excerpt:
      "Discover how commercial fishing vessels are adopting sustainable practices to protect marine ecosystems while maintaining productivity.",
    author: "Erik Johansson",
    authorImage: "/placeholder.svg?height=40&width=40&text=EJ",
    date: "June 2, 2023",
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=600&text=Sustainable+Fishing",
    tags: ["Sustainability", "Fishing", "Conservation"],
    featured: false,
    category: "Conservation",
  },
  {
    id: 4,
    title: "Life at Sea: Managing Mental Health on Long Voyages",
    excerpt:
      "Mental health challenges are common during extended periods at sea. Learn strategies for maintaining wellbeing during long voyages.",
    author: "Dr. Maria Rodriguez",
    authorImage: "/placeholder.svg?height=40&width=40&text=MR",
    date: "May 20, 2023",
    readTime: "15 min read",
    image: "/placeholder.svg?height=400&width=600&text=Mental+Health+at+Sea",
    tags: ["Health", "Wellbeing", "Crew Management"],
    featured: false,
    category: "Health",
  },
  {
    id: 5,
    title: "The Art of Celestial Navigation in the Digital Age",
    excerpt:
      "While GPS dominates modern navigation, celestial navigation remains a crucial skill. This article explores its continued relevance.",
    author: "Thomas Blackwood",
    authorImage: "/placeholder.svg?height=40&width=40&text=TB",
    date: "June 10, 2023",
    readTime: "11 min read",
    image: "/placeholder.svg?height=400&width=600&text=Celestial+Navigation",
    tags: ["Navigation", "Traditional Skills", "Astronomy"],
    featured: false,
    category: "Seamanship",
  },
  {
    id: 6,
    title: "Modern Piracy: Understanding and Mitigating Risks",
    excerpt:
      "Piracy remains a significant threat in certain maritime regions. Learn about current hotspots and security measures.",
    author: "Commander Alex Foster",
    authorImage: "/placeholder.svg?height=40&width=40&text=AF",
    date: "May 5, 2023",
    readTime: "14 min read",
    image: "/placeholder.svg?height=400&width=600&text=Maritime+Security",
    tags: ["Security", "Safety", "Risk Management"],
    featured: false,
    category: "Security",
  },
]

// Categories for filtering
const categories = ["All", "Seamanship", "Technology", "Conservation", "Health", "Security", "Education", "Career"]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-ocean-800 md:text-4xl">Sailor's Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Maritime insights, experiences, and knowledge shared by our community
          </p>
        </div>
        <Button className="bg-ocean-600 hover:bg-ocean-700" asChild>
          <Link href="/blog/create">
            <PenTool className="mr-2 h-4 w-4" />
            Write a Post
          </Link>
        </Button>
      </div>

      {/* Featured Posts */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-ocean-800">Featured Articles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-ocean-600">{post.category}</Badge>
              </div>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-ocean-800">{post.author}</p>
                    <p className="text-muted-foreground">
                      {post.date} · {post.readTime}
                    </p>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-ocean-800 hover:text-ocean-600">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-ocean-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-ocean-50 px-6 py-3">
                <Link
                  href={`/blog/${post.id}`}
                  className="flex items-center text-sm font-medium text-ocean-600 hover:text-ocean-800"
                >
                  Read Full Article
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* All Posts with Tabs */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-ocean-800">Explore Articles</h2>
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-2 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-full border border-ocean-200 bg-white data-[state=active]:bg-ocean-600 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(category === "All" ? recentPosts : recentPosts.filter((post) => post.category === category)).map(
                  (post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <Badge variant="outline" className="bg-ocean-50">
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-ocean-800 hover:text-ocean-600">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center gap-2">
                          <div className="relative h-6 w-6 overflow-hidden rounded-full">
                            <Image
                              src={post.authorImage || "/placeholder.svg"}
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-ocean-800">{post.author}</span>
                          <span className="text-xs text-muted-foreground">· {post.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}
