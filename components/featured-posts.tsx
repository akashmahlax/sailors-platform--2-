import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, ThumbsUp } from "lucide-react"

export default function FeaturedPosts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ocean-800">Featured Posts</h2>
        <Link href="/posts" className="text-sm font-medium text-ocean-600 hover:underline">
          View All Posts
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Ship+at+sea"
              alt="Ship at sea"
              fill
              className="object-cover"
            />
            <Badge className="absolute left-2 top-2 bg-ocean-600 hover:bg-ocean-700">
              <FileText className="mr-1 h-3 w-3" />
              Experience
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="mb-2 font-bold">Navigating the Stormy Seas of the North Atlantic</h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              A personal account of surviving a severe storm while crossing the North Atlantic. The waves crashed
              against our vessel with relentless fury...
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=CJ" alt="@captain_james" />
                <AvatarFallback>CJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Captain James Wilson</div>
                <div className="text-xs text-muted-foreground">Posted 3 days ago</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full justify-between">
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
              <Link href="/posts/1" className="text-sm font-medium text-ocean-600 hover:underline">
                Read More
              </Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Engine+room"
              alt="Engine room"
              fill
              className="object-cover"
            />
            <Badge className="absolute left-2 top-2 bg-ocean-600 hover:bg-ocean-700">
              <FileText className="mr-1 h-3 w-3" />
              Technical
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="mb-2 font-bold">Life as a Maritime Engineer: Challenges and Rewards</h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              The daily life and experiences of a chief engineer on cargo vessels. The engine room is my domain, a
              complex world of machinery...
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=ES" alt="@engineer_sarah" />
                <AvatarFallback>ES</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Sarah Chen, Chief Engineer</div>
                <div className="text-xs text-muted-foreground">Posted 1 week ago</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full justify-between">
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
              <Link href="/posts/2" className="text-sm font-medium text-ocean-600 hover:underline">
                Read More
              </Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Sunset+at+sea"
              alt="Sunset at sea"
              fill
              className="object-cover"
            />
            <Badge className="absolute left-2 top-2 bg-ocean-600 hover:bg-ocean-700">
              <FileText className="mr-1 h-3 w-3" />
              Personal
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="mb-2 font-bold">Finding Peace in the Solitude of the Sea</h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              Reflections on the spiritual journey of a long-term sailor. There's a unique kind of peace that comes with
              being surrounded by nothing but water...
            </p>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=SM" alt="@sailor_mike" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Michael Rodriguez</div>
                <div className="text-xs text-muted-foreground">Posted 2 weeks ago</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full justify-between">
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
              <Link href="/posts/3" className="text-sm font-medium text-ocean-600 hover:underline">
                Read More
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
