import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, BookOpen, FileText, Mic } from "lucide-react"

export default function FeaturedContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <Image src="/placeholder.svg?height=400&width=600" alt="Ship at sea" fill className="object-cover" />
          <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
            <BookOpen className="mr-1 h-3 w-3" />
            Chronicle
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold">Life as a Maritime Engineer: My Journey</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            An inspiring story of challenges and triumphs in the maritime industry, shared by Captain James Wilson.
          </p>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <span>By Captain James Wilson</span>
            <span className="mx-2">•</span>
            <span>5 days ago</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image src="/placeholder.svg?height=200&width=200" alt="Podcast thumbnail" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Mic className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">PODCAST</span>
            </div>
            <h3 className="font-medium">The Future of Sustainable Shipping</h3>
            <p className="text-xs text-muted-foreground">Maritime Talks • 45 min</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image src="/placeholder.svg?height=200&width=200" alt="News thumbnail" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">NEWS</span>
            </div>
            <h3 className="font-medium">New Regulations for International Waters</h3>
            <p className="text-xs text-muted-foreground">Maritime Times • 2 days ago</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
            <Image src="/placeholder.svg?height=200&width=200" alt="Resource thumbnail" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Anchor className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">RESOURCE</span>
            </div>
            <h3 className="font-medium">Essential Navigation Tools Guide</h3>
            <p className="text-xs text-muted-foreground">Maritime Academy • Updated</p>
          </div>
        </div>
      </div>
    </div>
  )
}
