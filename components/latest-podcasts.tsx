import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Headphones, Play } from "lucide-react"

export default function LatestPodcasts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Headphones className="h-6 w-6 text-ocean-700" />
          <h2 className="text-2xl font-bold text-ocean-800">Latest Podcasts</h2>
        </div>
        <Link href="/podcasts" className="text-sm font-medium text-ocean-600 hover:underline">
          View All Podcasts
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Sustainable+Shipping"
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
          <CardContent className="p-4">
            <h3 className="font-bold">The Future of Sustainable Shipping</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Industry experts discuss innovations in eco-friendly maritime technologies
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Maritime Talks</span>
              <span>45 min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Navigation+Challenges"
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
          <CardContent className="p-4">
            <h3 className="font-bold">Navigation Challenges in Modern Shipping</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Expert navigators share their experiences and best practices
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Sea Stories</span>
              <span>38 min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Mental+Health"
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
          <CardContent className="p-4">
            <h3 className="font-bold">Mental Health at Sea: Breaking the Stigma</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Maritime psychologists discuss wellbeing strategies for seafarers
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Seafarer Wellbeing</span>
              <span>52 min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Career+Paths"
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
          <CardContent className="p-4">
            <h3 className="font-bold">Maritime Career Paths and Opportunities</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Exploring diverse career options in the maritime industry
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Career Compass</span>
              <span>41 min</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
