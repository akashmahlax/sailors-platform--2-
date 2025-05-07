"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { ForumCategory } from "@/types/forum"

export default function NewTopicPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: searchParams.get("category") || "",
  })

  useEffect(() => {
    // Redirect if not logged in
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a new topic",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const fetchCategories = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch("/api/forum/categories")
        // if (!response.ok) throw new Error("Failed to fetch categories")
        // const data = await response.json()
        // setCategories(data)

        // Mock data for now
        setCategories([
          {
            id: "1",
            name: "Navigation & Equipment",
            description: "Discuss navigation tools and equipment issues",
            icon: "Compass",
            color: "blue",
            topicsCount: 156,
            postsCount: 1245,
          },
          {
            id: "2",
            name: "Regulations & Compliance",
            description: "Discuss maritime laws and regulatory compliance",
            icon: "FileText",
            color: "green",
            topicsCount: 98,
            postsCount: 876,
          },
          {
            id: "3",
            name: "Safety & Wellbeing",
            description: "Discuss health issues and wellbeing at sea",
            icon: "Shield",
            color: "red",
            topicsCount: 124,
            postsCount: 1087,
          },
          {
            id: "4",
            name: "Career Development",
            description: "Career advice and professional development for maritime professionals",
            icon: "Anchor",
            color: "purple",
            topicsCount: 87,
            postsCount: 654,
          },
          {
            id: "5",
            name: "Technology & Innovation",
            description: "Discuss emerging technologies in the maritime industry",
            icon: "Ship",
            color: "cyan",
            topicsCount: 112,
            postsCount: 932,
          },
          {
            id: "6",
            name: "General Discussion",
            description: "General maritime topics and community discussions",
            icon: "MessageCircle",
            color: "orange",
            topicsCount: 203,
            postsCount: 1876,
          },
        ])
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to load forum categories. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [session, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      categoryId: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your topic",
        variant: "destructive",
      })
      return
    }

    if (!formData.content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter content for your topic",
        variant: "destructive",
      })
      return
    }

    if (!formData.categoryId) {
      toast({
        title: "Category required",
        description: "Please select a category for your topic",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/forum/topics", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to create topic")
      // }

      // const data = await response.json()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Topic created",
        description: "Your topic has been created successfully",
      })

      // Redirect to the new topic
      // In a real app, this would use the ID from the API response
      // router.push(`/forum/topic/${data.id}`)
      router.push(`/forum/category/${formData.categoryId}`)
    } catch (error) {
      console.error("Error creating topic:", error)
      toast({
        title: "Error",
        description: "Failed to create your topic. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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

          <h1 className="text-3xl font-bold">Create New Topic</h1>
          <p className="mt-2 text-muted-foreground">Share your knowledge and questions with the maritime community</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Topic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive title for your topic"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select value={formData.categoryId} onValueChange={handleCategoryChange} required>
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Share your thoughts, questions, or insights..."
                  className="min-h-[200px] resize-y"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/forum">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Topic"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
