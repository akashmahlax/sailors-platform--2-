"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PenTool, ImageIcon, FileVideo, X, Upload, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Form schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }).max(200),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.string().min(1, { message: "Please add at least one tag" }),
})

// Categories
const categories = [
  "Seamanship",
  "Technology",
  "Conservation",
  "Health",
  "Security",
  "Education",
  "Career",
  "Culture",
  "History",
  "Travel",
]

export default function CreateBlogPost() {
  const router = useRouter()
  const { toast } = useToast()
  const [mediaFiles, setMediaFiles] = useState<{ type: "image" | "video"; url: string; file: File }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewContent, setPreviewContent] = useState("")

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
    },
  })

  // Watch content for preview
  const watchedContent = form.watch("content")

  // Handle media upload
  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const url = URL.createObjectURL(file)
    setMediaFiles([...mediaFiles, { type, url, file }])
  }

  // Remove media
  const removeMedia = (index: number) => {
    const newMediaFiles = [...mediaFiles]
    URL.revokeObjectURL(newMediaFiles[index].url)
    newMediaFiles.splice(index, 1)
    setMediaFiles(newMediaFiles)
  }

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // Here you would normally upload the media files and submit the form data
      // For this example, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Blog post created!",
        description: "Your blog post has been published successfully.",
      })

      router.push("/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your blog post. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update preview content
  const updatePreview = () => {
    setPreviewContent(watchedContent)
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ocean-800 md:text-4xl">Create Blog Post</h1>
        <p className="mt-2 text-muted-foreground">Share your maritime knowledge and experiences with the community</p>
      </div>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="write">
            <PenTool className="mr-2 h-4 w-4" />
            Write
          </TabsTrigger>
          <TabsTrigger value="preview" onClick={updatePreview}>
            <Info className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a compelling title for your post" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a brief summary of your post (will appear in previews)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This will be displayed in blog listings and search results.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your blog post content here..."
                            className="min-h-[300px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. navigation, safety, training (comma separated)" {...field} />
                          </FormControl>
                          <FormDescription>Separate tags with commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isSubmitting}>
                    {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                  </Button>
                </form>
              </Form>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Media</h3>

                  <div className="mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="image-upload"
                          className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-ocean-300 p-4 text-center hover:bg-ocean-50"
                        >
                          <ImageIcon className="mb-2 h-8 w-8 text-ocean-500" />
                          <span className="text-sm font-medium text-ocean-700">Add Image</span>
                          <span className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleMediaUpload(e, "image")}
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="video-upload"
                          className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-ocean-300 p-4 text-center hover:bg-ocean-50"
                        >
                          <FileVideo className="mb-2 h-8 w-8 text-ocean-500" />
                          <span className="text-sm font-medium text-ocean-700">Add Video</span>
                          <span className="mt-1 text-xs text-muted-foreground">MP4, WebM up to 20MB</span>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleMediaUpload(e, "video")}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {mediaFiles.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-sm font-medium">Uploaded Media</h4>
                      <div className="space-y-3">
                        {mediaFiles.map((media, index) => (
                          <div key={index} className="relative rounded-md border p-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1 h-6 w-6 rounded-full bg-black/50 text-white hover:bg-black/70"
                              onClick={() => removeMedia(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            {media.type === "image" ? (
                              <div className="relative h-24 w-full overflow-hidden rounded">
                                <Image
                                  src={media.url || "/placeholder.svg"}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <video src={media.url} controls className="h-24 w-full rounded object-cover"></video>
                            )}
                            <p className="mt-1 truncate text-xs text-muted-foreground">{media.file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium">Writing Tips</h4>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                        Use clear, concise language that's accessible to all readers
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                        Include relevant images to illustrate key points
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                        Break up long paragraphs for better readability
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                        Cite sources for any technical information or statistics
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-ocean-800">{form.watch("title") || "Your Post Title"}</h1>
            <div className="mb-6 flex items-center gap-4">
              <div className="rounded-full bg-ocean-100 p-2">
                <Upload className="h-4 w-4 text-ocean-600" />
              </div>
              <div>
                <p className="font-medium text-ocean-800">Your Name</p>
                <p className="text-sm text-muted-foreground">Today · Draft</p>
              </div>
            </div>
            <div className="mb-6 rounded-lg bg-ocean-50 p-4 text-sm text-ocean-800">
              {form.watch("excerpt") || "Your post excerpt will appear here..."}
            </div>
            <div className="prose max-w-none">
              {previewContent ? (
                <div className="whitespace-pre-wrap">{previewContent}</div>
              ) : (
                <p className="text-muted-foreground">Your content preview will appear here...</p>
              )}
            </div>
            {mediaFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Media</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {mediaFiles.map((media, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border">
                      {media.type === "image" ? (
                        <div className="relative h-48 w-full">
                          <Image src={media.url || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                        </div>
                      ) : (
                        <video src={media.url} controls className="h-48 w-full object-cover"></video>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
