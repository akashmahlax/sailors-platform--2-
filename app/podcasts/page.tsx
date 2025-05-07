"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Headphones, Play, PlayCircle, Plus, FileAudio, FileVideo } from "lucide-react"
import PodcastPlayer from "@/components/podcast-player"
import { useToast } from "@/components/ui/use-toast"

export default function PodcastsPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("featured")
  const [isAdmin, setIsAdmin] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    author: "",
    type: "audio", // audio or video
    file: null as File | null,
    thumbnail: null as File | null,
  })

  useEffect(() => {
    if (session?.user?.role === "admin") {
      setIsAdmin(true)
    }
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUploadData({
      ...uploadData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target
      setUploadData({
        ...uploadData,
        [name]: e.target.files[0],
      })
    }
  }

  const handleTypeChange = (value: string) => {
    setUploadData({
      ...uploadData,
      type: value,
    })
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadData.file || !uploadData.title || !uploadData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload a file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // In a real app, you would upload the file to a storage service
      // and then save the metadata to your database

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Upload successful",
        description: `Your ${uploadData.type} has been uploaded successfully`,
      })

      // Reset form
      setUploadData({
        title: "",
        description: "",
        author: "",
        type: "audio",
        file: null,
        thumbnail: null,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row"
      >
        <div>
          <h1 className="text-3xl font-bold text-ocean-800">Podcast Hub</h1>
          <p className="mt-2 text-muted-foreground">
            Listen to curated maritime podcasts and audio content from industry experts
          </p>
        </div>

        {isAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-ocean-600 hover:bg-ocean-700">
                <Plus className="mr-2 h-4 w-4" />
                Upload New Content
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleUpload}>
                <DialogHeader>
                  <DialogTitle>Upload New Content</DialogTitle>
                  <DialogDescription>
                    Add new audio or video content to the Podcast Hub. All fields are required.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={uploadData.title} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={uploadData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author/Host</Label>
                    <Input id="author" name="author" value={uploadData.author} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Tabs defaultValue="audio" onValueChange={handleTypeChange}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="audio">
                          <FileAudio className="mr-2 h-4 w-4" />
                          Audio
                        </TabsTrigger>
                        <TabsTrigger value="video">
                          <FileVideo className="mr-2 h-4 w-4" />
                          Video
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept={uploadData.type === "audio" ? "audio/*" : "video/*"}
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail Image</Label>
                    <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isUploading} className="bg-ocean-600 hover:bg-ocean-700">
                    {isUploading ? "Uploading..." : "Upload Content"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>

      <Tabs defaultValue="featured" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="latest">Latest Episodes</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Sustainable+Shipping"
                    alt="Podcast thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <Badge className="absolute left-2 top-2 bg-ocean-600 hover:bg-ocean-700">
                    <Headphones className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>The Future of Sustainable Shipping</CardTitle>
                  <CardDescription>
                    Industry experts discuss innovations in eco-friendly maritime technologies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Maritime Talks</span>
                    <span>45 min</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-ocean-600 hover:bg-ocean-700">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Navigation+Challenges"
                    alt="Podcast thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Navigation Challenges in Modern Shipping</CardTitle>
                  <CardDescription>Expert navigators share their experiences and best practices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Sea Stories</span>
                    <span>38 min</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-ocean-600 hover:bg-ocean-700">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400&text=Mental+Health"
                    alt="Podcast thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Mental Health at Sea: Breaking the Stigma</CardTitle>
                  <CardDescription>Maritime psychologists discuss wellbeing strategies for seafarers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Seafarer Wellbeing</span>
                    <span>52 min</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-ocean-600 hover:bg-ocean-700">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        <TabsContent value="latest" className="mt-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">Latest episodes from our maritime podcasts</p>
            <div className="space-y-4">
              {/* Latest episodes would be listed here */}
              <p className="text-center text-muted-foreground">Latest episodes content placeholder</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="popular" className="mt-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">Most popular episodes based on listener engagement</p>
            <div className="space-y-4">
              {/* Popular episodes would be listed here */}
              <p className="text-center text-muted-foreground">Popular episodes content placeholder</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="series" className="mt-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">Browse our podcast series collections</p>
            <div className="space-y-4">
              {/* Series would be listed here */}
              <p className="text-center text-muted-foreground">Series content placeholder</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-2xl font-bold text-ocean-800">Now Playing</h2>
        <Card>
          <CardContent className="p-6">
            <PodcastPlayer
              title="The Future of Sustainable Shipping"
              author="Maritime Talks"
              image="/placeholder.svg?height=400&width=400&text=Sustainable+Shipping"
              duration={2700} // 45 minutes in seconds
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
