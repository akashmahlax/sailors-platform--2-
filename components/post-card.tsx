"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  FileText,
  Heart,
  ImageIcon,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  Video,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface PostCardProps {
  user: {
    name: string
    avatar: string
    role?: string
    verified?: boolean
  }
  timeAgo: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  type: "blog" | "photo" | "video" | "audio" | "news" | "discussion" | "event"
}

export default function PostCard({ user, timeAgo, content, image, likes, comments, shares, type }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleComment = () => {
    if (!commentText.trim()) return

    // Here you would typically send the comment to the server
    // For now, we'll just clear the input and keep the comments open
    setCommentText("")
  }

  const getTypeIcon = () => {
    switch (type) {
      case "blog":
        return <BookOpen className="h-3 w-3" />
      case "photo":
        return <ImageIcon className="h-3 w-3" />
      case "video":
        return <Video className="h-3 w-3" />
      case "audio":
        return <Mic className="h-3 w-3" />
      case "news":
        return <FileText className="h-3 w-3" />
      case "discussion":
        return <MessageCircle className="h-3 w-3" />
      case "event":
        return <FileText className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{user.name}</span>
                  {user.verified && (
                    <Badge variant="outline" className="ml-1 h-4 px-1 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                {user.role && <div className="text-xs text-muted-foreground">{user.role}</div>}
                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{timeAgo}</span>
                  <span>•</span>
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                    <span className="flex items-center gap-1">
                      {getTypeIcon()}
                      <span className="capitalize">{type}</span>
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save post</DropdownMenuItem>
                <DropdownMenuItem>Follow {user.name}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Report post</DropdownMenuItem>
                <DropdownMenuItem>Hide post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 space-y-3">
            <p className="text-sm">{content}</p>
            {image && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="relative mt-3 overflow-hidden rounded-lg"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Post image"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </motion.div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3 fill-primary text-primary" />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{comments} comments</span>
              <span>{shares} shares</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t px-4 py-3">
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  liked ? "text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={handleLike}
              >
                {liked ? <Heart className="h-4 w-4 fill-primary" /> : <Heart className="h-4 w-4" />}
                <span>Like</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Comment</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a comment..."
                        className="min-h-[80px] resize-none"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" onClick={handleComment} disabled={!commentText.trim()}>
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Commenter" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">John Doe</span>
                            <span className="text-xs text-muted-foreground">• 30m ago</span>
                          </div>
                          <p className="mt-1 text-sm">
                            Great insights! I've experienced similar challenges during my voyages in that region.
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-3 pl-2 text-xs text-muted-foreground">
                          <button className="hover:text-foreground">Like</button>
                          <button className="hover:text-foreground">Reply</button>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Commenter" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium">Anna Smith</span>
                            <span className="text-xs text-muted-foreground">• 45m ago</span>
                          </div>
                          <p className="mt-1 text-sm">
                            Thanks for sharing this. Would you mind elaborating on the specific challenges you faced?
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-3 pl-2 text-xs text-muted-foreground">
                          <button className="hover:text-foreground">Like</button>
                          <button className="hover:text-foreground">Reply</button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {comments > 2 && (
                    <Button variant="outline" size="sm" className="w-full">
                      View all {comments} comments
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
