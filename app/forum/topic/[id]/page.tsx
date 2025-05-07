"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Flag,
  Heart,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Pin,
  Reply,
  Share,
  ThumbsUp,
  Trash,
  Unlock,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { ForumPost, ForumTopic } from "@/types/forum"

export default function TopicPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const replyRef = useRef<HTMLTextAreaElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [topic, setTopic] = useState<ForumTopic | null>(null)
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [replyText, setReplyText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)

  const topicId = params.id as string

  useEffect(() => {
    // Check if user is admin or moderator
    if (session?.user) {
      setIsAdmin(session.user.role === "admin")
      setIsModerator(session.user.role === "admin" || session.user.role === "moderator")
    }

    const fetchTopicAndPosts = async () => {
      try {
        // In a real app, these would be API calls
        // const topicResponse = await fetch(`/api/forum/topics/${topicId}`)
        // const postsResponse = await fetch(`/api/forum/topics/${topicId}/posts?page=${currentPage}`)

        // if (!topicResponse.ok || !postsResponse.ok) {
        //   throw new Error("Failed to fetch topic data")
        // }

        // const topicData = await topicResponse.json()
        // const postsData = await postsResponse.json()

        // setTopic(topicData.topic)
        // setPosts(postsData.posts)
        // setTotalPages(postsData.totalPages)

        // Mock data for now
        const categoryId = topicId.split("-")[0]
        const topicIndex = Number.parseInt(topicId.split("-")[1])

        const mockTopic: ForumTopic = {
          id: topicId,
          title: getRandomTopicTitle(Number.parseInt(categoryId), topicIndex),
          author: {
            id: `user-${topicIndex}`,
            name: getRandomAuthorName(topicIndex),
            avatar: `/placeholder.svg?height=40&width=40&text=U${topicIndex}`,
          },
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000),
          repliesCount: Math.floor(Math.random() * 50) + 5,
          viewsCount: Math.floor(Math.random() * 500) + 50,
          likesCount: Math.floor(Math.random() * 30) + 2,
          isPinned: topicIndex <= 2,
          isLocked: topicIndex === 3,
          categoryId,
          categoryName: getCategoryName(categoryId),
        }

        setTopic(mockTopic)

        // Generate mock posts
        const mockPosts: ForumPost[] = []
        const postsPerPage = 10
        const totalPosts = mockTopic.repliesCount + 1 // +1 for the original post
        const totalPageCount = Math.ceil(totalPosts / postsPerPage)
        setTotalPages(totalPageCount)

        // Original post is always first
        mockPosts.push({
          id: `${topicId}-post-0`,
          topicId,
          content: getRandomPostContent(Number.parseInt(categoryId), 0),
          author: {
            id: mockTopic.author.id,
            name: mockTopic.author.name,
            avatar: mockTopic.author.avatar,
            role: Math.random() > 0.8 ? "Moderator" : undefined,
            joinDate: new Date(Date.now() - Math.floor(Math.random() * 1000) * 24 * 60 * 60 * 1000),
            postCount: Math.floor(Math.random() * 500) + 50,
          },
          createdAt: mockTopic.createdAt,
          updatedAt: mockTopic.createdAt,
          likesCount: Math.floor(Math.random() * 20) + 1,
          isOriginalPost: true,
        })

        // Calculate which posts to show based on current page
        const startIndex = (currentPage - 1) * postsPerPage
        const endIndex = Math.min(startIndex + postsPerPage, totalPosts)

        // Skip the first post if we're not on the first page
        const firstPostIndex = currentPage === 1 ? 1 : startIndex

        for (let i = firstPostIndex; i < endIndex; i++) {
          // Random time between topic creation and now
          const createdAt = new Date(
            mockTopic.createdAt.getTime() + Math.floor(Math.random() * (Date.now() - mockTopic.createdAt.getTime())),
          )

          mockPosts.push({
            id: `${topicId}-post-${i}`,
            topicId,
            content: getRandomPostContent(Number.parseInt(categoryId), i),
            author: {
              id: `user-${i + 10}`,
              name: getRandomAuthorName(i + 10),
              avatar: `/placeholder.svg?height=40&width=40&text=U${i + 10}`,
              role: Math.random() > 0.9 ? "Moderator" : undefined,
              joinDate: new Date(Date.now() - Math.floor(Math.random() * 1000) * 24 * 60 * 60 * 1000),
              postCount: Math.floor(Math.random() * 300) + 10,
            },
            createdAt,
            updatedAt: createdAt,
            likesCount: Math.floor(Math.random() * 10),
            isOriginalPost: false,
          })
        }

        setPosts(mockPosts)
      } catch (error) {
        console.error("Error fetching topic data:", error)
        toast({
          title: "Error",
          description: "Failed to load topic data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopicAndPosts()
  }, [topicId, currentPage, session, toast])

  const getRandomTopicTitle = (categoryId: number, index: number) => {
    const titles = {
      1: [
        // Navigation & Equipment
        "Best practices for night navigation in busy shipping lanes",
        "GPS vs. Traditional navigation methods: A comparison",
        "Troubleshooting common radar issues at sea",
        "Electronic Chart Display and Information System (ECDIS) tips and tricks",
        "Navigating in extreme weather conditions",
      ],
      2: [
        // Regulations & Compliance
        "Understanding the latest IMO regulations",
        "MARPOL compliance challenges and solutions",
        "Port State Control inspection preparation guide",
        "Maritime Labor Convention: Rights and responsibilities",
        "Ballast water management regulations explained",
      ],
      3: [
        // Safety & Wellbeing
        "Mental health resources for long voyages",
        "Nutrition strategies for optimal health at sea",
        "Managing fatigue during extended watches",
        "Emergency response drills: Beyond the minimum requirements",
        "Creating a positive safety culture onboard",
      ],
      4: [
        // Career Development
        "Certification pathways for deck officers",
        "From cadet to captain: Career progression strategies",
        "Interview preparation for maritime positions",
        "Building a competitive maritime resume",
        "Continuing education opportunities for seafarers",
      ],
      5: [
        // Technology & Innovation
        "Autonomous vessel developments and implications",
        "Blockchain applications in maritime logistics",
        "AI and machine learning in maritime operations",
        "Digital twins for vessel performance optimization",
        "Alternative fuels and propulsion technologies",
      ],
      6: [
        // General Discussion
        "Share your most memorable voyage",
        "Best ports to visit around the world",
        "Unusual maritime traditions from different regions",
        "Favorite maritime books and films",
        "Sustainable practices for everyday shipboard life",
      ],
    }

    const categoryTitles = titles[categoryId as keyof typeof titles] || titles[6]
    return categoryTitles[index % categoryTitles.length]
  }

  const getRandomPostContent = (categoryId: number, index: number) => {
    if (index === 0) {
      // Original post content is longer
      const originalPostContents = [
        "I've been navigating through some challenging waters recently and wanted to share my experiences and get some feedback from fellow mariners. During my last voyage through the Singapore Strait, we encountered some unexpected challenges with visibility and traffic density.\n\nHere are some of the techniques I found helpful:\n\n1. Maintaining a dedicated lookout at all times, even when using radar and AIS\n2. Reducing speed in areas of high traffic density\n3. Establishing clear communication protocols with the bridge team\n4. Using both visual and electronic means to verify vessel positions\n\nI'm curious to hear what strategies others have found effective in similar situations. Have you encountered similar challenges? What worked well for you?",

        "After years of relying on traditional navigation methods, our vessel recently upgraded to the latest GPS and electronic navigation systems. While the technology is impressive, I've noticed some interesting differences in how we approach navigation now.\n\nTraditional methods forced us to maintain constant situational awareness and develop a deeper understanding of our environment. The new systems provide incredible precision but sometimes create a sense of overreliance.\n\nI'd like to start a discussion about balancing these approaches. How do you integrate traditional navigation skills with modern technology? Do you have any practices that help maintain proficiency in both?",

        "Our vessel has been experiencing intermittent radar issues during critical navigation periods, and I wanted to share some troubleshooting steps that have worked for us and see if others have additional suggestions.\n\nWe've identified several common causes:\n\n- Power supply fluctuations affecting the radar unit\n- Interference from other electronic equipment\n- Environmental factors like heavy rain or sea spray\n- Antenna positioning and maintenance issues\n\nOur current protocol involves a systematic check of these elements when issues arise. Has anyone developed more efficient diagnostic procedures or encountered unusual causes worth noting?",

        "I'm preparing for an upcoming Port State Control inspection and would appreciate insights from those who have recently gone through the process. The regulatory landscape seems to be evolving rapidly, and I want to ensure we're fully prepared.\n\nAreas I'm particularly concerned about:\n\n- Documentation requirements for crew certifications\n- Environmental compliance records\n- Safety equipment maintenance logs\n- Rest hour compliance\n\nAre there any recent focus areas or common deficiencies that inspectors have been particularly attentive to? Any advice on preparation would be greatly appreciated.",

        "Mental health at sea remains a challenge for many seafarers, especially during extended contracts. I'd like to open a discussion about effective resources and strategies that have helped you or your crew members maintain good mental health during long voyages.\n\nSome approaches we've implemented include:\n\n- Regular video calls with family when possible\n- Organized social activities onboard\n- Exercise programs adapted for limited space\n- Mindfulness and meditation resources\n\nWhat has worked well in your experience? Are there any resources or programs that have been particularly helpful?",
      ]

      return originalPostContents[index % originalPostContents.length]
    } else {
      // Reply content is shorter
      const replyContents = [
        "I've encountered similar situations in the Malacca Strait. One additional practice we've implemented is conducting regular scenario-based drills specifically for high-traffic areas. This has significantly improved our team's response time and decision-making under pressure.",

        "Great points! I'd add that maintaining a proper lookout becomes even more critical in areas with fishing vessels that may not be following standard traffic patterns. We've had several close calls that were avoided only because of vigilant visual observation.",

        "In my experience, the key is integration rather than replacement. We use electronic systems as primary tools but regularly cross-check with traditional methods. This approach has saved us several times when GPS signals were compromised or electronic charts had discrepancies.",

        "I've found that requiring officers to periodically navigate using traditional methods during calm conditions helps maintain those skills. We schedule regular training sessions where all electronic aids except for basic radar are turned off for a watch period.",

        "We experienced similar radar issues and discovered that the problem was related to our power conditioning system. After installing a dedicated UPS for the navigation equipment, the intermittent problems disappeared. Might be worth checking your power supply quality.",

        "Don't forget to check for physical obstructions near the antenna. We once traced an intermittent issue to a newly installed light that was partially blocking the radar's rotation path during certain wind conditions.",

        "Recent PSC inspections in our region have been focusing heavily on implementation of cyber security measures and documentation of drills. Make sure your cyber security procedures are up to date and properly documented.",

        "Rest hour compliance has been a major focus in recent inspections we've undergone. Inspectors are cross-checking records with other documentation like engine logs and bridge logs to verify authenticity. Ensure your records are consistent across all documentation.",

        "We've had success with a structured peer support program where crew members are paired up to check in with each other regularly. It creates accountability and provides a first line of support before issues escalate.",

        "Something that worked surprisingly well on our vessel was creating a ship's book club. We rotate book selections monthly, and it's created a positive shared experience and topic of conversation beyond work duties.",
      ]

      return replyContents[index % replyContents.length]
    }
  }

  const getRandomAuthorName = (seed: number) => {
    const firstNames = ["James", "Sarah", "Michael", "Emma", "David", "Olivia", "John", "Sophia", "Robert", "Ava"]
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"]

    const firstName = firstNames[seed % firstNames.length]
    const lastName = lastNames[(seed * 3) % lastNames.length]

    return `${firstName} ${lastName}`
  }

  const getCategoryName = (categoryId: string) => {
    const categories = {
      "1": "Navigation & Equipment",
      "2": "Regulations & Compliance",
      "3": "Safety & Wellbeing",
      "4": "Career Development",
      "5": "Technology & Innovation",
      "6": "General Discussion",
    }

    return categories[categoryId as keyof typeof categories] || "General Discussion"
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const handleSubmitReply = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reply to this topic",
        variant: "destructive",
      })
      return
    }

    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter a message before submitting",
        variant: "destructive",
      })
      return
    }

    if (topic?.isLocked) {
      toast({
        title: "Topic locked",
        description: "This topic is locked and cannot receive new replies",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/topics/${topicId}/reply`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ content: replyText }),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to submit reply")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the new reply to the posts
      const newPost: ForumPost = {
        id: `${topicId}-post-${Date.now()}`,
        topicId,
        content: replyText,
        author: {
          id: session.user.id,
          name: session.user.name || "User",
          avatar:
            session.user.image || `/placeholder.svg?height=40&width=40&text=${session.user.name?.charAt(0) || "U"}`,
          joinDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
          postCount: 42,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        likesCount: 0,
        isOriginalPost: false,
      }

      setPosts([...posts, newPost])
      setReplyText("")

      // Update the topic
      if (topic) {
        setTopic({
          ...topic,
          repliesCount: topic.repliesCount + 1,
          updatedAt: new Date(),
        })
      }

      toast({
        title: "Reply posted",
        description: "Your reply has been posted successfully",
      })
    } catch (error) {
      console.error("Error submitting reply:", error)
      toast({
        title: "Error",
        description: "Failed to submit your reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikePost = async (postId: string) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like this post",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/posts/${postId}/like`, {
      //   method: "POST",
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to like post")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update the post likes count
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likesCount: post.likesCount + 1,
            }
          }
          return post
        }),
      )

      toast({
        title: "Post liked",
        description: "You have liked this post",
      })
    } catch (error) {
      console.error("Error liking post:", error)
      toast({
        title: "Error",
        description: "Failed to like the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTogglePinTopic = async () => {
    if (!isAdmin && !isModerator) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to pin/unpin topics",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/topics/${topicId}/pin`, {
      //   method: "POST",
      //   body: JSON.stringify({ pinned: !topic?.isPinned }),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to update topic")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update the topic
      if (topic) {
        setTopic({
          ...topic,
          isPinned: !topic.isPinned,
        })
      }

      toast({
        title: topic?.isPinned ? "Topic unpinned" : "Topic pinned",
        description: topic?.isPinned
          ? "The topic has been unpinned successfully"
          : "The topic has been pinned successfully",
      })
    } catch (error) {
      console.error("Error updating topic:", error)
      toast({
        title: "Error",
        description: "Failed to update the topic. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleToggleLockTopic = async () => {
    if (!isAdmin && !isModerator) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to lock/unlock topics",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/topics/${topicId}/lock`, {
      //   method: "POST",
      //   body: JSON.stringify({ locked: !topic?.isLocked }),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to update topic")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update the topic
      if (topic) {
        setTopic({
          ...topic,
          isLocked: !topic.isLocked,
        })
      }

      toast({
        title: topic?.isLocked ? "Topic unlocked" : "Topic locked",
        description: topic?.isLocked
          ? "The topic has been unlocked successfully"
          : "The topic has been locked successfully",
      })
    } catch (error) {
      console.error("Error updating topic:", error)
      toast({
        title: "Error",
        description: "Failed to update the topic. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTopic = async () => {
    if (!isAdmin && !isModerator) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete topics",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/topics/${topicId}`, {
      //   method: "DELETE",
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to delete topic")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Topic deleted",
        description: "The topic has been deleted successfully",
      })

      // Redirect to the category page
      if (topic?.categoryId) {
        router.push(`/forum/category/${topic.categoryId}`)
      } else {
        router.push("/forum")
      }
    } catch (error) {
      console.error("Error deleting topic:", error)
      toast({
        title: "Error",
        description: "Failed to delete the topic. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReportPost = async (postId: string) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to report this post",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/posts/${postId}/report`, {
      //   method: "POST",
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to report post")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Post reported",
        description: "Thank you for your report. Our moderators will review it.",
      })
    } catch (error) {
      console.error("Error reporting post:", error)
      toast({
        title: "Error",
        description: "Failed to report the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!isAdmin && !isModerator) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete posts",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/forum/posts/${postId}`, {
      //   method: "DELETE",
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to delete post")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove the post from the list
      setPosts(posts.filter((post) => post.id !== postId))

      // Update the topic
      if (topic) {
        setTopic({
          ...topic,
          repliesCount: topic.repliesCount - 1,
        })
      }

      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleScrollToReply = () => {
    if (replyRef.current) {
      replyRef.current.focus()
      replyRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!topic && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-2xl font-bold">Topic Not Found</h1>
          <p className="mt-2 text-muted-foreground">The topic you're looking for doesn't exist or has been removed.</p>
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
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/forum">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Forum
              </Link>
            </Button>
            {topic?.categoryId && (
              <>
                <span className="text-muted-foreground">/</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/forum/category/${topic.categoryId}`}>{topic.categoryName}</Link>
                </Button>
              </>
            )}
          </div>

          {isLoading ? (
            <div className="mt-4 animate-pulse space-y-2">
              <div className="h-8 w-3/4 rounded bg-muted"></div>
              <div className="h-4 w-1/2 rounded bg-muted"></div>
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">{topic?.title}</h1>
                {topic?.isPinned && (
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    <Pin className="mr-1 h-3 w-3" />
                    Pinned
                  </Badge>
                )}
                {topic?.isLocked && (
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">
                    <Lock className="mr-1 h-3 w-3" />
                    Locked
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{topic?.repliesCount} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{topic?.viewsCount} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{topic?.likesCount} likes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-1/4 rounded bg-muted"></div>
                      <div className="h-4 w-1/3 rounded bg-muted"></div>
                      <div className="h-20 w-full rounded bg-muted"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card id={`post-${post.id}`} className={post.isOriginalPost ? "border-primary/30" : ""}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Author sidebar */}
                        <div className="border-b bg-muted/20 p-4 md:w-48 md:border-b-0 md:border-r">
                          <div className="flex flex-row items-center gap-4 md:flex-col md:items-start">
                            <Avatar className="h-12 w-12 border">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{post.author.name}</div>
                              {post.author.role && (
                                <Badge variant="outline" className="mt-1">
                                  {post.author.role}
                                </Badge>
                              )}
                              <div className="mt-2 text-xs text-muted-foreground">
                                <div>Joined: {post.author.joinDate && formatDate(post.author.joinDate)}</div>
                                <div>Posts: {post.author.postCount}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Post content */}
                        <div className="flex-1 p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Posted {formatTimeAgo(post.createdAt)}
                              {post.updatedAt.getTime() !== post.createdAt.getTime() && (
                                <span> (edited {formatTimeAgo(post.updatedAt)})</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 rounded-full p-0"
                                onClick={() => handleLikePost(post.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${post.likesCount > 0 ? "fill-primary text-primary" : ""}`}
                                />
                                <span className="sr-only">Like</span>
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 rounded-full p-0"
                                onClick={handleScrollToReply}
                                disabled={topic?.isLocked}
                              >
                                <Reply className="h-4 w-4" />
                                <span className="sr-only">Reply</span>
                              </Button>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleReportPost(post.id)}>
                                    <Flag className="mr-2 h-4 w-4" />
                                    Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/forum/post/${post.id}/share`}>
                                      <Share className="mr-2 h-4 w-4" />
                                      Share
                                    </Link>
                                  </DropdownMenuItem>

                                  {(isAdmin || isModerator) && (
                                    <>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem asChild>
                                        <Link href={`/forum/post/${post.id}/edit`}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="mt-4 whitespace-pre-line text-sm">{post.content}</div>

                          {post.likesCount > 0 && (
                            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                              <Heart className="h-3 w-3 fill-primary text-primary" />
                              <span>
                                {post.likesCount} like{post.likesCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Reply form */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Reply to this topic</h2>

              {topic?.isLocked ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Lock className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <h3 className="text-lg font-medium">This topic is locked</h3>
                    <p className="text-muted-foreground">New replies are no longer accepted</p>
                  </CardContent>
                </Card>
              ) : !session ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-medium">Authentication Required</h3>
                    <p className="mb-4 text-muted-foreground">Please sign in to reply to this topic</p>
                    <Button asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="hidden h-10 w-10 border sm:block">
                        <AvatarImage
                          src={
                            session.user.image ||
                            `/placeholder.svg?height=40&width=40&text=${session.user.name?.charAt(0) || "U"}`
                          }
                          alt={session.user.name || "User"}
                        />
                        <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          ref={replyRef}
                          placeholder="Write your reply..."
                          className="min-h-[150px] resize-y"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="mt-4 flex justify-end">
                          <Button onClick={handleSubmitReply} disabled={isSubmitting || !replyText.trim()}>
                            {isSubmitting ? "Posting..." : "Post Reply"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Moderator actions */}
            {(isAdmin || isModerator) && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Moderator Actions</h2>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={handleTogglePinTopic}>
                    <Pin className="mr-2 h-4 w-4" />
                    {topic?.isPinned ? "Unpin Topic" : "Pin Topic"}
                  </Button>

                  <Button variant="outline" onClick={handleToggleLockTopic}>
                    {topic?.isLocked ? (
                      <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Unlock Topic
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Lock Topic
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Topic
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the topic and all its replies.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteTopic}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}
