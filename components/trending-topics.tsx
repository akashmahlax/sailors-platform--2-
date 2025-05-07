import { Badge } from "@/components/ui/badge"
import { Anchor, BarChart, MessageSquare, Ship, Users } from "lucide-react"

export default function TrendingTopics() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Ship className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-medium">Sustainable Shipping Practices</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>128 posts</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>56 participants</span>
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              Environment
            </Badge>
            <Badge variant="outline" className="text-xs">
              Innovation
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Anchor className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-medium">New Port Regulations in Asia</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>94 posts</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>42 participants</span>
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              Regulations
            </Badge>
            <Badge variant="outline" className="text-xs">
              Asia
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <BarChart className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-medium">Career Development in Maritime Industry</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>76 posts</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>38 participants</span>
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              Career
            </Badge>
            <Badge variant="outline" className="text-xs">
              Education
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
