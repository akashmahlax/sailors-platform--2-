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
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { uploadImage } from "@/lib/cloudinary-client"
import { FileText, ImageIcon, Mic, Video, Send, X, Camera, Upload, Globe, Lock, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreatePostPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("text")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [visibility, setVisibility] = useState("public")
  const [postContent, setPostContent] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not logged in
  if (!session) {
    router.push("/login")
    return null
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMediaFile(file)

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

  const clearMedia = () => {
    setMediaPreview(null)
    setMediaFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!postContent.trim() && !mediaFile) {
      toast({
        title: "Empty post",
        description: "Please add some content to your post",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      let mediaUrl = null

      // Upload media if exists
      if (mediaFile) {
        const uploadResult = await uploadImage(mediaFile)
        mediaUrl = uploadResult.url
      }

      // Create post object
      const postData = {
        title: postTitle.trim() || null,
        content: postContent.trim(),
        type: activeTab,
        mediaUrl,
        isAnonymous,
        visibility,
        authorId: session.user.id,
        authorName: isAnonymous ? "Anonymous Sailor" : session.user.name,
        authorImage: isAnonymous ? null : session.user.image,
        createdAt: new Date().toISOString(),
      }

      // Send to API
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      toast({
        title: "Post created",
        description: "Your post has been published successfully",
      })

      // Redirect to home or post page
      router.push("/")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMediaInputAccept = () => {
    switch (activeTab) {
      case "image":
        return "image/*"
      case "video":
        return "video/*"
      case "audio":
        return "audio/*"
      default:
        return ""
    }
  }

  const renderMediaPreview = () => {
    if (!mediaPreview) return null

    switch (activeTab) {
      case "image":
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
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
            <CardDescription>Share your maritime experiences with the community</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage
                    src={
                      isAnonymous
                        ? "/placeholder.svg?height=40&width=40&query=anonymous"
                        : session.user.image || "/placeholder.svg?height=40&width=40"
                    }
                    alt={isAnonymous ? "Anonymous" : session.user.name || "User"}
                  />
                  <AvatarFallback>{isAnonymous ? "A" : session.user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{isAnonymous ? "Anonymous Sailor" : session.user.name}</p>
                  <div className="flex items-center gap-2">
                    <Select value={visibility} onValueChange={setVisibility}>
                      <SelectTrigger className="h-7 w-[130px]">
                        <SelectValue placeholder="Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5" />
                            <span>Public</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="friends">
                          <div className="flex items-center gap-2">
                            <Users className="h-3.5 w-3.5" />
                            <span>Friends</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-3.5 w-3.5" />
                            <span>Private</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="anonymous" className="text-sm">
                    Post anonymously
                  </Label>
                  <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  placeholder="Add a title to your post"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>

              <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="text">
                    <FileText className="mr-2 h-4 w-4" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="image">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="mr-2 h-4 w-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="audio">
                    <Mic className="mr-2 h-4 w-4" />
                    Audio
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind, sailor?"
                    className="min-h-[200px]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <Textarea
                    placeholder="Add a caption to your image..."
                    className="min-h-[100px]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />

                  {!mediaPreview && (
                    <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                      <div className="text-center">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-semibold">Add an image</h3>
                        <p className="text-sm text-muted-foreground">Upload a photo to share with the community</p>
                        <Button variant="secondary" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Select Image
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleMediaChange}
                      />
                    </div>
                  )}

                  {renderMediaPreview()}
                </TabsContent>

                <TabsContent value="video" className="space-y-4">
                  <Textarea
                    placeholder="Add a caption to your video..."
                    className="min-h-[100px]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />

                  {!mediaPreview && (
                    <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                      <div className="text-center">
                        <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-semibold">Add a video</h3>
                        <p className="text-sm text-muted-foreground">Upload a video to share with the community</p>
                        <Button variant="secondary" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Select Video
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleMediaChange}
                      />
                    </div>
                  )}

                  {renderMediaPreview()}
                </TabsContent>

                <TabsContent value="audio" className="space-y-4">
                  <Textarea
                    placeholder="Add a description to your audio..."
                    className="min-h-[100px]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />

                  {!mediaPreview && (
                    <div className="flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                      <div className="text-center">
                        <Mic className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-semibold">Add audio</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload an audio recording to share with the community
                        </p>
                        <Button variant="secondary" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Select Audio
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleMediaChange}
                      />
                    </div>
                  )}

                  {renderMediaPreview()}
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
                    Publish
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
