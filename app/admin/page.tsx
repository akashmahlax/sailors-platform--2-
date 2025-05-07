"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, BarChart3, Flag, Headphones, Settings, Shield, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import AdminSidebar from "@/components/admin-sidebar"

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not admin
  if (session && session.user.role !== "admin") {
    router.push("/")
    return null
  }

  // Redirect if not logged in
  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
        <AdminSidebar />
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your platform and monitor activity</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button size="sm">
                  <Shield className="mr-2 h-4 w-4" />
                  Moderation Queue
                  <Badge className="ml-2 bg-background text-primary">12</Badge>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12,548</div>
                      <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">45,271</div>
                      <p className="text-xs text-muted-foreground">+18.2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                      <Flag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">-4 since yesterday</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Server Load</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">68%</div>
                      <Progress value={68} className="mt-2" />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                >
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Platform Activity</CardTitle>
                      <CardDescription>User engagement over the past 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full rounded-md border bg-muted/30 p-6">
                        <div className="flex h-full items-center justify-center">
                          <p className="text-sm text-muted-foreground">Activity chart placeholder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Reports</CardTitle>
                      <CardDescription>Latest content flagged by users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Inappropriate content in forum post</p>
                            <p className="text-xs text-muted-foreground">Reported by 3 users • 2 hours ago</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="destructive">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Spam comments on blog post</p>
                            <p className="text-xs text-muted-foreground">Reported by 5 users • 4 hours ago</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="destructive">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Misleading information in news post</p>
                            <p className="text-xs text-muted-foreground">Reported by 2 users • 6 hours ago</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="destructive">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="podcasts" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Podcast Management</CardTitle>
                          <CardDescription>Manage and publish podcasts to the platform</CardDescription>
                        </div>
                        <Button>
                          <Headphones className="mr-2 h-4 w-4" />
                          Upload New Podcast
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="h-16 w-16 rounded-md bg-muted"></div>
                                <div>
                                  <h3 className="font-medium">The Future of Sustainable Shipping</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Industry experts discuss innovations in eco-friendly maritime technologies
                                  </p>
                                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>45 min</span>
                                    <span>•</span>
                                    <span>Published 2 days ago</span>
                                    <span>•</span>
                                    <Badge variant="outline" className="px-1 text-[10px]">
                                      Featured
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-md border">
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="h-16 w-16 rounded-md bg-muted"></div>
                                <div>
                                  <h3 className="font-medium">Navigation Challenges in Modern Shipping</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Expert navigators share their experiences and best practices
                                  </p>
                                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>38 min</span>
                                    <span>•</span>
                                    <span>Published 1 week ago</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
