export interface ForumCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  topicsCount: number
  postsCount: number
  latestTopics?: ForumTopicPreview[]
}

export interface ForumTopicPreview {
  id: string
  title: string
  updatedAt: Date
  repliesCount: number
}

export interface ForumTopic {
  id: string
  title: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: Date
  updatedAt: Date
  repliesCount: number
  viewsCount: number
  likesCount: number
  isPinned: boolean
  isLocked: boolean
  categoryId?: string
  categoryName?: string
  lastReplyAuthor?: {
    id: string
    name: string
    avatar: string
  }
}

export interface ForumPost {
  id: string
  topicId: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role?: string
    joinDate?: Date
    postCount?: number
  }
  createdAt: Date
  updatedAt: Date
  likesCount: number
  isOriginalPost: boolean
}
