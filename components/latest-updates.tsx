import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp } from "lucide-react"

export default function LatestUpdates() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">• 2 hours ago</span>
          </div>
          <p className="mt-1 text-sm">Shared a new photo from their voyage in the Mediterranean Sea.</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground">
              <ThumbsUp className="h-3 w-3" />
              <span>24 Likes</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>5 Comments</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Sarah Miller</span>
            <span className="text-xs text-muted-foreground">• 5 hours ago</span>
          </div>
          <p className="mt-1 text-sm">Posted a new article: "Safety Measures for Extreme Weather Conditions at Sea"</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground">
              <ThumbsUp className="h-3 w-3" />
              <span>42 Likes</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>12 Comments</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user3" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Robert Johnson</span>
            <span className="text-xs text-muted-foreground">• 8 hours ago</span>
          </div>
          <p className="mt-1 text-sm">Uploaded a new document: "Guide to International Maritime Regulations 2023"</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground">
              <ThumbsUp className="h-3 w-3" />
              <span>18 Likes</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>3 Comments</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user4" />
          <AvatarFallback>EW</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Emma Wilson</span>
            <span className="text-xs text-muted-foreground">• 12 hours ago</span>
          </div>
          <p className="mt-1 text-sm">Started a new discussion: "Mental Health Support for Long Voyages"</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground">
              <ThumbsUp className="h-3 w-3" />
              <span>56 Likes</span>
            </button>
            <button className="flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>24 Comments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
