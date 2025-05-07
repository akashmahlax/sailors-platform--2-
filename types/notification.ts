export interface Notification {
  id: string
  userId: string
  type: "like" | "comment" | "follow" | "message" | "system" | "support"
  message: string
  read: boolean
  createdAt: Date
  link?: string
  fromUser?: {
    id: string
    name: string
    image?: string
  }
  urgent?: boolean
}
