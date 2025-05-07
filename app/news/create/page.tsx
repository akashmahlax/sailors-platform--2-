"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { uploadImage } from "@/lib/cloudinary-client"
import { FileText, ImageIcon, Mic, Video, Send, X, Camera, Upload, Globe, Users, Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateNewsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("article")
  const [isPreview, setIsPreview] = useState(false)
  const [newsData, setNewsData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    type: "article",
    visibility: "public",
    featuredImage: null as File | null,
    mediaFile: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not admin
  if (session && session.user.role !== "admin") {
    router.push("/news")
    return null
  }

  // Redirect if not logged in
  if (!session) {
    router.push("/login")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewsData({
      ...newsData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewsData({
      ...newsData,
      [name]: value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewsData({
        ...newsData,
        featuredImage: file,
      })

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewsData({
        ...newsData,
        mediaFile: file,
      })

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setMediaPreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setImagePreview(null)
    setNewsData({
      ...newsData,
      featuredImage: null,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const clearMedia = () => {
    setMediaPreview(null)
    setNewsData({
      ...newsData,
      mediaFile: null,
    })
    if (mediaInputRef.current) {
      mediaInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newsData.title.trim() || !newsData.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and content for your news item",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let featuredImageUrl = null
      let mediaUrl = null

      // Upload featured image if exists
      if (newsData.featuredImage) {
        const uploadResult = await uploadImage(newsData.featuredImage)
        featuredImageUrl = uploadResult.url
      }

      // Upload media if exists
      if (newsData.mediaFile) {
        const uploadResult = await uploadImage(newsData.mediaFile)
        mediaUrl = uploadResult.url
      }

      // Create news object
      const newsItem = {
        title: newsData.title.trim(),
        excerpt: newsData.excerpt.trim() || newsData.content.trim().substring(0, 150) + "...",
        content: newsData.content.trim(),
        category: newsData.category,
        type: activeTab,
        visibility: newsData.visibility,
        featuredImage: featuredImageUrl,
        mediaUrl,
        authorId: session.user.id,
        authorName: session.user.name,
        authorImage: session.user.image,
        publishedAt: new Date().toISOString(),
      }

      // Send to API
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsItem),
      })

      if (!response.ok) {
        throw new Error("Failed to create news item")
      }

      toast({
        title: "News published",
        description: "Your news item has been published successfully",
      })

      // Redirect to news page
      router.push("/news")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish news. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMediaInputAccept = () => {
    switch (activeTab) {
      case "video":
        return "video/*"
      case "audio":
        return "audio/*"
      case "gallery":
        return "image/*"
      default:
        return ""
    }
  }

  const renderMediaPreview = () => {
    if (!mediaPreview) return null

    switch (activeTab) {
      case "video":
        return (
          <div className="relative mt-4 rounded-lg overflow-hidden">
            <video src={mediaPreview} controls className="w-full max-h-[400px]" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      case "audio":
        return (
          <div className="relative mt-4 p-4 rounded-lg bg-black/5">
            <audio src={mediaPreview} controls className="w-full" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      case "gallery":
        return (
          <div className="relative mt-4 rounded-lg overflow-hidden">
            <img
              src={mediaPreview || "/placeholder.svg"}
              alt="Preview"
              className="w-full max-h-[400px] object-contain bg-black/5"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
              onClick={clearMedia}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ocean-800">Create News</h1>
            <p className="mt-2 text-muted-foreground">Publish maritime news, articles, videos, and more</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>News Content</CardTitle>
              <CardDescription>Create your maritime news content</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a compelling title"
                    value={newsData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt (optional)</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Brief summary of your news item"
                    value={newsData.excerpt}
                    onChange={handleInputChange}
                    className="h-20"
                  />
                  <p className="text-xs text-muted-foreground">
                    If left empty, an excerpt will be generated from your content
                  </p>
                </div>

                <Tabs defaultValue="article" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="article">
                      <FileText className="mr-2 h-4 w-4" />
                      Article
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="audio">
                      <Mic className="mr-2 h-4 w-4" />
                      Audio
                    </TabsTrigger>
                    <TabsTrigger value="gallery">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Gallery
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="article" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Article Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Write your article content here..."
                        value={newsData.content}
                        onChange={handleInputChange}
                        className="min-h-[300px]"
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Video Description</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Describe your video content..."
                        value={newsData.content}
                        onChange={handleInputChange}
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Video</Label>
                      {!mediaPreview ? (
                        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                          <div className="text-center">
                            <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-lg font-semibold">Add a video</h3>
                            <p className="text-sm text-muted-foreground">Upload a video for your news item</p>
                            <Button
                              variant="secondary"
                              className="mt-4"
                              onClick={() => mediaInputRef.current?.click()}
                              type="button"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Select Video
                            </Button>
                          </div>
                          <input
                            ref={mediaInputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleMediaChange}
                          />
                        </div>
                      ) : (
                        renderMediaPreview()
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="audio" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Audio Description</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Describe your audio content..."
                        value={newsData.content}
                        onChange={handleInputChange}
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Audio</Label>
                      {!mediaPreview ? (
                        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                          <div className="text-center">
                            <Mic className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-lg font-semibold">Add audio</h3>
                            <p className="text-sm text-muted-foreground">Upload an audio file for your news item</p>
                            <Button
                              variant="secondary"
                              className="mt-4"
                              onClick={() => mediaInputRef.current?.click()}
                              type="button"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Select Audio
                            </Button>
                          </div>
                          <input
                            ref={mediaInputRef}
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={handleMediaChange}
                          />
                        </div>
                      ) : (
                        renderMediaPreview()
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Gallery Description</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Describe your image gallery..."
                        value={newsData.content}
                        onChange={handleInputChange}
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Gallery Images</Label>
                      {!mediaPreview ? (
                        <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                          <div className="text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-lg font-semibold">Add images</h3>
                            <p className="text-sm text-muted-foreground">Upload images for your gallery</p>
                            <Button
                              variant="secondary"
                              className="mt-4"
                              onClick={() => mediaInputRef.current?.click()}
                              type="button"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Select Images
                            </Button>
                          </div>
                          <input
                            ref={mediaInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMediaChange}
                          />
                        </div>
                      ) : (
                        renderMediaPreview()
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-ocean-600 hover:bg-ocean-700" disabled={isLoading}>
                  {isLoading ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Publish News
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>News Settings</CardTitle>
                <CardDescription>Configure your news item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newsData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regulations">Regulations</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="weather">Weather</SelectItem>
                      <SelectItem value="interviews">Interviews</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={newsData.visibility}
                    onValueChange={(value) => handleSelectChange("visibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>Public</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="members">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Members Only</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  {!imagePreview ? (
                    <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Upload a featured image</p>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-2"
                          onClick={() => fileInputRef.current?.click()}
                          type="button"
                        >
                          Select Image
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden">
                      <img src={imagePreview || "/placeholder.svg"} alt="Featured" className="w-full h-auto" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
                        onClick={clearImage}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ocean-100 p-1 mt-0.5">
                      <FileText className="h-3 w-3 text-ocean-700" />
                    </div>
                    <span>Use clear, concise titles that accurately describe your content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ocean-100 p-1 mt-0.5">
                      <FileText className="h-3 w-3 text-ocean-700" />
                    </div>
                    <span>Include relevant keywords to improve discoverability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ocean-100 p-1 mt-0.5">
                      <FileText className="h-3 w-3 text-ocean-700" />
                    </div>
                    <span>Add high-quality images to make your content more engaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-ocean-100 p-1 mt-0.5">
                      <FileText className="h-3 w-3 text-ocean-700" />
                    </div>
                    <span>Verify all facts and sources before publishing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
