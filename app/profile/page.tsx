"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { uploadImage } from "@/lib/cloudinary-client"
import {
  User,
  Settings,
  MapPin,
  Mail,
  Ship,
  Calendar,
  FileText,
  Upload,
  Trash2,
  Save,
  Anchor,
  Award,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Globe,
  PenTool,
} from "lucide-react"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("about")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    bio: "",
    location: "",
    position: "",
    experience: "",
    joinDate: "January 2023",
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      github: "",
      website: "",
    },
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not logged in
  if (!session) {
    router.push("/login")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setIsLoading(true)

      try {
        const result = await uploadImage(file)

        // Update session with new image
        await update({
          ...session,
          user: {
            ...session?.user,
            image: result.url,
          },
        })

        toast({
          title: "Profile image updated",
          description: "Your profile image has been updated successfully",
        })
      } catch (error) {
        console.error("Error uploading image:", error)
        toast({
          title: "Upload failed",
          description: "Failed to upload profile image. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRemoveImage = async () => {
    setIsLoading(true)

    try {
      // Update session with removed image
      await update({
        ...session,
        user: {
          ...session?.user,
          image: null,
        },
      })

      toast({
        title: "Profile image removed",
        description: "Your profile image has been removed successfully",
      })
    } catch (error) {
      console.error("Error removing image:", error)
      toast({
        title: "Action failed",
        description: "Failed to remove profile image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)

    try {
      // Mock API call to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update session with new name
      await update({
        ...session,
        user: {
          ...session?.user,
          name: profileData.name,
        },
      })

      setIsEditing(false)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for activity
  const recentActivity = [
    {
      type: "post",
      title: "Navigating Through Stormy Seas: A Captain's Perspective",
      date: "2 days ago",
      icon: <PenTool className="h-4 w-4" />,
    },
    {
      type: "comment",
      title: "Commented on 'Modern Navigation Systems'",
      date: "5 days ago",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      type: "like",
      title: "Liked 'Safety Protocols for Engine Room Operations'",
      date: "1 week ago",
      icon: <ThumbsUp className="h-4 w-4" />,
    },
    {
      type: "upload",
      title: "Uploaded 'Maritime Safety Guidelines.pdf'",
      date: "2 weeks ago",
      icon: <Upload className="h-4 w-4" />,
    },
    {
      type: "post",
      title: "The Importance of Mental Health at Sea",
      date: "3 weeks ago",
      icon: <PenTool className="h-4 w-4" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 text-muted-foreground">Manage your personal information and account settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar
                      className={`h-32 w-32 cursor-pointer border-4 border-white shadow-lg ${
                        isEditing ? "hover:opacity-80" : ""
                      }`}
                      onClick={handleProfileImageClick}
                    >
                      <AvatarImage src={session.user.image || "/placeholder.svg"} alt={session.user.name || ""} />
                      <AvatarFallback className="text-3xl">{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute -right-2 -top-2 flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white shadow-md"
                          onClick={handleProfileImageClick}
                        >
                          <Upload className="h-4 w-4" />
                          <span className="sr-only">Upload image</span>
                        </Button>
                        {session.user.image && (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-red-50 hover:text-red-600"
                            onClick={handleRemoveImage}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        )}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <h2 className="text-xl font-bold">{session.user.name}</h2>
                  <p className="text-sm text-muted-foreground">{profileData.position || "Maritime Professional"}</p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">{profileData.experience || "Experienced"}</Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {session.user.role === "admin" ? "Administrator" : "Member"}
                    </Badge>
                  </div>

                  <div className="mt-6 w-full space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{session.user.email}</span>
                    </div>
                    {profileData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.position || "Position not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    {!isEditing ? (
                      <Button className="w-full" onClick={() => setIsEditing(true)}>
                        <PenTool className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-ocean-600 hover:bg-ocean-700"
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 flex w-full flex-wrap justify-center gap-3">
                    {profileData.socialLinks.facebook && (
                      <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                          <Facebook className="h-5 w-5 text-[#1877F2]" />
                        </Button>
                      </a>
                    )}
                    {profileData.socialLinks.twitter && (
                      <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                        </Button>
                      </a>
                    )}
                    {profileData.socialLinks.linkedin && (
                      <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                          <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                        </Button>
                      </a>
                    )}
                    {profileData.socialLinks.instagram && (
                      <a href={profileData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                          <Instagram className="h-5 w-5 text-[#E4405F]" />
                        </Button>
                      </a>
                    )}
                    {profileData.socialLinks.github && (
                      <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                          <Github className="h-5 w-5" />
                        </Button>
                      </a>
                    )}
                    {profileData.socialLinks.website && (
                      <a href={profileData.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                          <Globe className="h-5 w-5 text-ocean-600" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="about">
                  <User className="mr-2 h-4 w-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <FileText className="mr-2 h-4 w-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>Share information about yourself with the maritime community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell us about yourself, your maritime experience, and interests..."
                            className="min-h-[150px]"
                            value={profileData.bio}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="position">Maritime Position</Label>
                            <Select
                              value={profileData.position}
                              onValueChange={(value) => handleSelectChange("position", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="captain">Captain</SelectItem>
                                <SelectItem value="officer">Deck Officer</SelectItem>
                                <SelectItem value="engineer">Engineer</SelectItem>
                                <SelectItem value="crew">Crew Member</SelectItem>
                                <SelectItem value="cadet">Cadet</SelectItem>
                                <SelectItem value="shore">Shore Staff</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Select
                              value={profileData.experience}
                              onValueChange={(value) => handleSelectChange("experience", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-2">0-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="11-20">11-20 years</SelectItem>
                                <SelectItem value="20+">20+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="City, Country"
                            value={profileData.location}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Biography</h3>
                          <p className="text-muted-foreground">
                            {profileData.bio || "No biography provided yet. Edit your profile to add a bio."}
                          </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 text-lg font-medium">Maritime Experience</h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <Ship className="mt-0.5 h-5 w-5 text-ocean-600" />
                                <div>
                                  <p className="font-medium">Position</p>
                                  <p className="text-sm text-muted-foreground">
                                    {profileData.position || "Not specified"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Anchor className="mt-0.5 h-5 w-5 text-ocean-600" />
                                <div>
                                  <p className="font-medium">Experience</p>
                                  <p className="text-sm text-muted-foreground">
                                    {profileData.experience || "Not specified"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Award className="mt-0.5 h-5 w-5 text-ocean-600" />
                                <div>
                                  <p className="font-medium">Certifications</p>
                                  <p className="text-sm text-muted-foreground">None added yet</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="mb-2 text-lg font-medium">Personal Information</h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-5 w-5 text-ocean-600" />
                                <div>
                                  <p className="font-medium">Location</p>
                                  <p className="text-sm text-muted-foreground">
                                    {profileData.location || "Not specified"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Mail className="mt-0.5 h-5 w-5 text-ocean-600" />
                                <div>
                                  <p className="font-medium">Email</p>
                                  <p className="text-sm text-muted-foreground">{session.user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <BookOpen className="mt-0.5 h-5 w-5 text-ocean-600" />
                                <div>
                                  <p className="font-medium">Interests</p>
                                  <p className="text-sm text-muted-foreground">None added yet</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent interactions on the Sailor's Platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-100">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Connect your social media profiles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook" className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-[#1877F2]" />
                        Facebook
                      </Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        placeholder="https://facebook.com/username"
                        value={profileData.socialLinks.facebook}
                        onChange={handleSocialLinkChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        placeholder="https://twitter.com/username"
                        value={profileData.socialLinks.twitter}
                        onChange={handleSocialLinkChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        value={profileData.socialLinks.linkedin}
                        onChange={handleSocialLinkChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-[#E4405F]" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        placeholder="https://instagram.com/username"
                        value={profileData.socialLinks.instagram}
                        onChange={handleSocialLinkChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        name="github"
                        placeholder="https://github.com/username"
                        value={profileData.socialLinks.github}
                        onChange={handleSocialLinkChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-ocean-600" />
                        Personal Website
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://yourwebsite.com"
                        value={profileData.socialLinks.website}
                        onChange={handleSocialLinkChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      Email Preferences
                    </Button>
                    <Button variant="outline" className="w-full">
                      Privacy Settings
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
