"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Upload,
  FileText,
  FileImage,
  FileVideo,
  FileIcon as FilePdf,
  File,
  X,
  Info,
  Check,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(500),
  category: z.string().min(1, { message: "Please select a category" }),
  tags: z.string().optional(),
})

// Categories
const categories = [
  "Navigation Charts",
  "Training Materials",
  "Safety Protocols",
  "Technical Manuals",
  "Research Papers",
  "Voyage Reports",
  "Maritime Regulations",
  "Educational Resources",
  "Historical Documents",
  "Other",
]

export default function UploadCenter() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
    },
  })

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFiles = Array.from(selectedFiles)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  // Remove file
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    const type = file.type
    if (type.includes("image")) return <FileImage className="h-6 w-6 text-blue-500" />
    if (type.includes("video")) return <FileVideo className="h-6 w-6 text-red-500" />
    if (type.includes("pdf")) return <FilePdf className="h-6 w-6 text-orange-500" />
    if (type.includes("text")) return <FileText className="h-6 w-6 text-green-500" />
    return <File className="h-6 w-6 text-gray-500" />
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Simulate upload progress
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadStatus("uploading")
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadStatus("success")
          return 100
        }
        return prevProgress + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      })
      return
    }

    // Simulate upload
    simulateUpload()

    // In a real application, you would upload the files to your server here
    // For this example, we'll just simulate a successful upload after the progress reaches 100%
    setTimeout(() => {
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} file(s).`,
      })

      // Reset form
      form.reset()
      setFiles([])
      setUploadProgress(0)
      setUploadStatus("idle")
    }, 5000)
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ocean-800 md:text-4xl">Upload Center</h1>
        <p className="mt-2 text-muted-foreground">Share maritime resources, documents, and media with the community</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </TabsTrigger>
              <TabsTrigger value="my-uploads">
                <FileText className="mr-2 h-4 w-4" />
                My Uploads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Maritime Resources</CardTitle>
                  <CardDescription>
                    Share documents, images, videos, and other resources with the maritime community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a title for your upload" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide a detailed description of the uploaded content"
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

                      <div className="space-y-4">
                        <FormLabel>Files</FormLabel>
                        <div
                          className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-ocean-300 p-6 text-center hover:bg-ocean-50"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                              setFiles((prevFiles) => [...prevFiles, ...Array.from(e.dataTransfer.files)])
                            }
                          }}
                        >
                          <Upload className="mb-2 h-10 w-10 text-ocean-500" />
                          <h3 className="mb-1 text-lg font-medium text-ocean-700">Drag & Drop Files</h3>
                          <p className="mb-4 text-sm text-muted-foreground">or click to browse from your computer</p>
                          <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            Select Files
                          </Button>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4, etc. (Max 50MB per file)
                          </p>
                        </div>

                        {files.length > 0 && (
                          <div className="mt-4 rounded-md border bg-ocean-50 p-4">
                            <h4 className="mb-3 font-medium">Selected Files ({files.length})</h4>
                            <div className="max-h-60 overflow-y-auto">
                              {files.map((file, index) => (
                                <div
                                  key={index}
                                  className="mb-2 flex items-center justify-between rounded-md border bg-white p-2"
                                >
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(file)}
                                    <div>
                                      <p className="text-sm font-medium text-ocean-800">{file.name}</p>
                                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-500"
                                    onClick={() => removeFile(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {uploadStatus === "uploading" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Uploading...</span>
                            <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      {uploadStatus === "success" && (
                        <Alert className="bg-green-50 text-green-800">
                          <Check className="h-4 w-4 text-green-500" />
                          <AlertTitle>Upload Complete</AlertTitle>
                          <AlertDescription>
                            Your files have been successfully uploaded and are now available to the community.
                          </AlertDescription>
                        </Alert>
                      )}

                      {uploadStatus === "error" && (
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Upload Failed</AlertTitle>
                          <AlertDescription>
                            There was an error uploading your files. Please try again.
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button type="submit" className="w-full bg-ocean-600 hover:bg-ocean-700" disabled={isUploading}>
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Files
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-uploads">
              <Card>
                <CardHeader>
                  <CardTitle>My Uploads</CardTitle>
                  <CardDescription>View and manage your previously uploaded resources</CardDescription>
                </CardHeader>
                <CardContent>
                  {session ? (
                    <div className="text-center">
                      <FileText className="mx-auto mb-4 h-16 w-16 text-ocean-300" />
                      <h3 className="mb-2 text-lg font-medium">No uploads yet</h3>
                      <p className="mb-4 text-muted-foreground">
                        You haven't uploaded any resources yet. Start sharing with the community!
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[value="upload"]')?.click()}>
                        Upload Your First Resource
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Info className="mx-auto mb-4 h-16 w-16 text-ocean-300" />
                      <h3 className="mb-2 text-lg font-medium">Sign in to view your uploads</h3>
                      <p className="mb-4 text-muted-foreground">
                        You need to be signed in to view and manage your uploaded resources.
                      </p>
                      <Button variant="outline" asChild>
                        <a href="/login">Sign In</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium text-ocean-800">Acceptable Content</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Maritime charts, maps, and navigational resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Training materials and educational resources
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Safety protocols and best practices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Technical manuals and guides
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Research papers and maritime studies
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-ocean-800">File Requirements</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Maximum file size: 50MB per file
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4, etc.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Files must be virus-free and safe for download
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-ocean-800">Content Policies</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Respect copyright and intellectual property rights
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Do not upload confidential or classified information
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Content must be relevant to the maritime community
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-ocean-500" />
                    Uploads are subject to review by moderators
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-ocean-50 px-6 py-4">
              <p className="text-xs text-muted-foreground">
                By uploading content, you agree to our{" "}
                <a href="/terms" className="text-ocean-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-ocean-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
