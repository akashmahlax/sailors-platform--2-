import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink, BookOpen, Video, Compass, Anchor } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-ocean-800 md:text-4xl">Maritime Resources</h1>
        <p className="mt-2 text-lg text-muted-foreground">Access valuable resources for maritime professionals</p>
      </div>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[600px] md:mx-auto">
          <TabsTrigger value="guides">
            <BookOpen className="mr-2 h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="navigation">
            <Compass className="mr-2 h-4 w-4" />
            Navigation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Safety at Sea Guide</CardTitle>
                <CardDescription>Essential safety protocols for maritime operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 4.2 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Fundamentals</CardTitle>
                <CardDescription>Basic principles of maritime navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 6.8 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Response Manual</CardTitle>
                <CardDescription>Procedures for handling maritime emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 5.1 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>IMO Regulations 2023</CardTitle>
                <CardDescription>Latest International Maritime Organization regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 12.4 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SOLAS Convention</CardTitle>
                <CardDescription>Safety of Life at Sea convention documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 8.7 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MARPOL Guidelines</CardTitle>
                <CardDescription>Marine pollution prevention documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 7.2 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Modern Navigation Systems</CardTitle>
                <CardDescription>Video tutorial on using advanced navigation systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Video • 24 min</Badge>
                  <Button size="sm" asChild>
                    <Link href="#">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engine Room Operations</CardTitle>
                <CardDescription>Comprehensive guide to engine room procedures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Video • 42 min</Badge>
                  <Button size="sm" asChild>
                    <Link href="#">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Drills Demonstration</CardTitle>
                <CardDescription>Visual guide to conducting effective safety drills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Video • 18 min</Badge>
                  <Button size="sm" asChild>
                    <Link href="#">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Electronic Chart Systems</CardTitle>
                <CardDescription>Guide to ECDIS and electronic navigation tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 9.3 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Celestial Navigation</CardTitle>
                <CardDescription>Traditional navigation techniques using celestial bodies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 5.6 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weather Routing</CardTitle>
                <CardDescription>Optimizing routes based on weather forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">PDF • 7.8 MB</Badge>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 rounded-lg bg-ocean-50 p-6 border border-ocean-200">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-ocean-100 p-3">
            <Anchor className="h-6 w-6 text-ocean-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ocean-800">Request Specific Resources</h2>
            <p className="mt-2 text-muted-foreground">
              Can't find what you're looking for? Submit a request for specific maritime resources and our team will
              help you locate them.
            </p>
            <Button className="mt-4 bg-ocean-600 hover:bg-ocean-700">Submit Resource Request</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
