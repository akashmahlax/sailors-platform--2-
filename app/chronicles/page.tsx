import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, MessageSquare, Plus, Search, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ChroniclesPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Sailor's Chronicles</h1>
          <p className="mt-2 text-muted-foreground">Personal stories and experiences from maritime professionals</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search chronicles..." className="pl-9 md:w-[300px]" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Chronicle
          </Button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          All
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          Adventure
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          Professional
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          Technical
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          Educational
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          Personal
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">
          Historical
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/placeholder.svg?height=400&width=600" alt="Ship at sea" fill className="object-cover" />
            <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-1 h-3 w-3" />
              Adventure
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>Navigating the Stormy Seas of the North Atlantic</CardTitle>
            <CardDescription>
              A personal account of surviving a severe storm while crossing the North Atlantic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@captain_james" />
                <AvatarFallback>CJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Captain James Wilson</div>
                <div className="text-xs text-muted-foreground">Posted 3 days ago</div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              The waves crashed against our vessel with relentless fury as we navigated through one of the worst storms
              I've encountered in my 20 years at sea. The North Atlantic showed its true power that night, testing both
              our ship and our resolve...
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>124</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>32</span>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chronicles/1">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/placeholder.svg?height=400&width=600" alt="Engine room" fill className="object-cover" />
            <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-1 h-3 w-3" />
              Technical
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>Life as a Maritime Engineer: Challenges and Rewards</CardTitle>
            <CardDescription>The daily life and experiences of a chief engineer on cargo vessels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@engineer_sarah" />
                <AvatarFallback>ES</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Sarah Chen, Chief Engineer</div>
                <div className="text-xs text-muted-foreground">Posted 1 week ago</div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              The engine room is my domain, a complex world of machinery that keeps our vessel moving across vast
              oceans. As a chief engineer, my day starts before dawn with system checks and ends long after sunset. The
              challenges are numerous, but the satisfaction of keeping everything running smoothly is immeasurable...
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>98</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>24</span>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chronicles/2">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/placeholder.svg?height=400&width=600" alt="Sunset at sea" fill className="object-cover" />
            <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-1 h-3 w-3" />
              Personal
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>Finding Peace in the Solitude of the Sea</CardTitle>
            <CardDescription>Reflections on the spiritual journey of a long-term sailor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@sailor_mike" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Michael Rodriguez</div>
                <div className="text-xs text-muted-foreground">Posted 2 weeks ago</div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              There's a unique kind of peace that comes with being surrounded by nothing but water for months at a time.
              The endless horizon becomes a canvas for introspection, and the rhythm of the waves a meditation. After 15
              years at sea, I've learned that the ocean has much to teach about patience, resilience, and finding inner
              calm...
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>156</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>42</span>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chronicles/3">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/placeholder.svg?height=400&width=600" alt="Historical ship" fill className="object-cover" />
            <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-1 h-3 w-3" />
              Historical
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>The Lost Traditions of Sailing Ships</CardTitle>
            <CardDescription>Preserving the heritage and traditions of the golden age of sail</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@historian_emma" />
                <AvatarFallback>HE</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Dr. Emma Thompson</div>
                <div className="text-xs text-muted-foreground">Posted 3 weeks ago</div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              Before the age of engines and GPS, sailing was an art form passed down through generations. The complex
              rituals, superstitions, and skills that defined life aboard traditional sailing vessels are rapidly fading
              from memory. As a maritime historian, I've dedicated my career to documenting these practices before
              they're lost forever...
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>87</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>19</span>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chronicles/4">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/placeholder.svg?height=400&width=600" alt="Training session" fill className="object-cover" />
            <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-1 h-3 w-3" />
              Educational
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>From Cadet to Captain: My Journey Through Maritime Education</CardTitle>
            <CardDescription>The path of professional development in the maritime industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@captain_robert" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Captain Robert Johnson</div>
                <div className="text-xs text-muted-foreground">Posted 1 month ago</div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              Twenty-five years ago, I stepped onto the deck of my first vessel as a nervous cadet. Today, I command my
              own ship. The journey from cadet to captain is filled with challenges, continuous learning, and personal
              growth. For those considering a maritime career or just starting out, I want to share the lessons I've
              learned along the way...
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>112</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>38</span>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chronicles/5">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/placeholder.svg?height=400&width=600" alt="Sustainable ship" fill className="object-cover" />
            <Badge className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700">
              <BookOpen className="mr-1 h-3 w-3" />
              Professional
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>Pioneering Sustainable Practices in Maritime Operations</CardTitle>
            <CardDescription>Implementing eco-friendly solutions in modern shipping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@eco_lisa" />
                <AvatarFallback>EL</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Lisa Greenwood, Environmental Officer</div>
                <div className="text-xs text-muted-foreground">Posted 1 month ago</div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3 text-sm text-muted-foreground">
              The maritime industry faces increasing pressure to reduce its environmental footprint. As an environmental
              officer for a major shipping company, I've been at the forefront of implementing sustainable practices
              across our fleet. From alternative fuels to waste management systems, the challenges are significant but
              the progress is promising...
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>134</span>
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>45</span>
              </span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/chronicles/6">Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More Chronicles</Button>
      </div>
    </div>
  )
}
