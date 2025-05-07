import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const topicId = params.id
    const { content } = await request.json()

    // Validate input
    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if topic exists and is not locked
    const topic = await db.collection("forumTopics").findOne({
      _id: new ObjectId(topicId),
    })

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    if (topic.isLocked) {
      return NextResponse.json({ error: "Topic is locked" }, { status: 403 })
    }

    // Create reply
    const now = new Date()
    const result = await db.collection("forumPosts").insertOne({
      topicId,
      content,
      authorId: session.user.id,
      createdAt: now,
      updatedAt: now,
      likesCount: 0,
      isOriginalPost: false,
    })

    // Update topic
    await db.collection("forumTopics").updateOne(
      { _id: new ObjectId(topicId) },
      {
        $inc: { repliesCount: 1 },
        $set: { updatedAt: now },
      },
    )

    // Update category
    await db.collection("forumCategories").updateOne(
      { _id: new ObjectId(topic.categoryId) },
      {
        $inc: { postsCount: 1 },
        $set: { updatedAt: now },
      },
    )

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        topicId,
        content,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating forum reply:", error)
    return NextResponse.json({ error: "Failed to create forum reply" }, { status: 500 })
  }
}
