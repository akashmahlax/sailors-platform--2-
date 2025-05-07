"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageCircle, Search, Shield, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { io } from "socket.io-client"

export default function SupportPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [supportData, setSupportData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    anonymous: false,
    urgent: false,
    category: "general",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSupportData({
      ...supportData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setSupportData({
      ...supportData,
      [name]: checked,
    })
  }

  const handleRadioChange = (value: string) => {
    setSupportData({
      ...supportData,
      category: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch("/api/support", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(supportData),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to submit support request")
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Send real-time notification to admin
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001")
      socket.emit("support-message", {
        from: supportData.anonymous ? "Anonymous User" : supportData.name || session?.user?.name || "User",
        subject: supportData.subject,
        urgent: supportData.urgent,
        category: supportData.category,
        timestamp: new Date(),
      })

      toast({
        title: "Support request submitted",
        description: "We'll get back to you as soon as possible",
      })

      // Reset form
      setSupportData({
        name: "",
        email: "",
        subject: "",
        message: "",
        anonymous: false,
        urgent: false,
        category: "general",
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Failed to submit support request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-ocean-800">Support Center</h1>
        <p className="mt-2 text-muted-foreground">Get help from our community and support team</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mb-8 max-w-2xl"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for help articles, topics, or questions..." className="pl-10" />
        </div>
      </motion.div>

      <Tabs defaultValue="contact" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Support Forum</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>
        <TabsContent value="forum" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Users className="h-5 w-5 text-ocean-600" />
                  <div>
                    <CardTitle className="text-lg">Navigation & Equipment</CardTitle>
                    <CardDescription>Discuss navigation tools and equipment issues</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Topics</span>
                      <span>156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Posts</span>
                      <span>1,245</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">GPS Calibration Issues</div>
                      <div className="text-xs text-muted-foreground">Updated 2 hours ago • 24 replies</div>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">Radar Maintenance Tips</div>
                      <div className="text-xs text-muted-foreground">Updated 5 hours ago • 18 replies</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Forum
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-ocean-600" />
                  <div>
                    <CardTitle className="text-lg">Regulations & Compliance</CardTitle>
                    <CardDescription>Discuss maritime laws and regulatory compliance</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Topics</span>
                      <span>98</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Posts</span>
                      <span>876</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">IMO 2023 Regulations</div>
                      <div className="text-xs text-muted-foreground">Updated 1 day ago • 32 replies</div>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">Port State Control Inspections</div>
                      <div className="text-xs text-muted-foreground">Updated 3 days ago • 15 replies</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Forum
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Shield className="h-5 w-5 text-ocean-600" />
                  <div>
                    <CardTitle className="text-lg">Safety & Wellbeing</CardTitle>
                    <CardDescription>Discuss health issues and wellbeing at sea</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Topics</span>
                      <span>124</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Posts</span>
                      <span>1,087</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">Mental Health Resources</div>
                      <div className="text-xs text-muted-foreground">Updated 4 hours ago • 45 replies</div>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-sm">
                      <div className="font-medium">Nutrition at Sea</div>
                      <div className="text-xs text-muted-foreground">Updated 2 days ago • 28 replies</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Forum
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Fill out the form below to get help from our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={supportData.name}
                        onChange={handleInputChange}
                        disabled={supportData.anonymous}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={supportData.email}
                        onChange={handleInputChange}
                        disabled={supportData.anonymous}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief description of your issue"
                      value={supportData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <RadioGroup
                      value={supportData.category}
                      onValueChange={handleRadioChange}
                      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="technical" id="technical" />
                        <Label htmlFor="technical">Technical</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="account" id="account" />
                        <Label htmlFor="account">Account</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="harassment" id="harassment" />
                        <Label htmlFor="harassment">Harassment</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Describe your issue in detail"
                      className="min-h-[150px]"
                      value={supportData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={supportData.anonymous}
                      onCheckedChange={(checked) => handleCheckboxChange("anonymous", checked as boolean)}
                    />
                    <label
                      htmlFor="anonymous"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Submit anonymously
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={supportData.urgent}
                      onCheckedChange={(checked) => handleCheckboxChange("urgent", checked as boolean)}
                    />
                    <label
                      htmlFor="urgent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mark as urgent
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-ocean-600 hover:bg-ocean-700" type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Support Request"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to common questions about the platform and maritime issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">How do I verify my maritime credentials?</h3>
                  <p className="text-sm text-muted-foreground">
                    To verify your maritime credentials, navigate to your profile settings and select "Verify
                    Credentials." Upload scanned copies of your certificates and licenses. Our team will review them
                    within 48 hours and update your profile accordingly.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Can I access content offline?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can download articles, guides, and resources for offline access. Look for the download icon
                    on content you wish to save. Downloaded content will be available in the "Offline Library" section
                    of your profile.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How do I report inappropriate content?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you encounter inappropriate content, click the "Report" button available on all posts and
                    comments. Provide details about why you're reporting the content, and our moderation team will
                    review it promptly.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How can I contribute to the Resource Library?</h3>
                  <p className="text-sm text-muted-foreground">
                    To contribute to the Resource Library, go to the "Upload Center" and select "Resource Submission."
                    Complete the form with details about your resource, upload the file, and submit it for review.
                    Approved resources will be added to the library with attribution.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Is there 24/7 emergency support available?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we provide 24/7 emergency support for urgent maritime issues. Use the "Emergency Support"
                    button in the Support Center or call our dedicated hotline at +1-800-SAILOR-HELP for immediate
                    assistance.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All FAQs
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
