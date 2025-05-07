import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, categoryId } = await request.json()

    // Validate input
    if (!title || !content || !categoryId) {
      return NextResponse.json({ error: "Title, content, and category are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if category exists
    const category = await db.collection("forumCategories").findOne({
      _id: new ObjectId(categoryId),
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Create topic
    const now = new Date()
    const topicResult = await db.collection("forumTopics").insertOne({
      title,
      authorId: session.user.id,
      categoryId,
      createdAt: now,
      updatedAt: now,
      repliesCount: 0,
      viewsCount: 0,
      likesCount: 0,
      isPinned: false,
      isLocked: false,
    })

    // Create first post (original post)
    await db.collection("forumPosts").insertOne({
      topicId: topicResult.insertedId.toString(),
      content,
      authorId: session.user.id,
      createdAt: now,
      updatedAt: now,
      likesCount: 0,
      isOriginalPost: true,
    })

    // Update category counts
    await db.collection("forumCategories").updateOne(
      { _id: new ObjectId(categoryId) },
      {
        $inc: {
          topicsCount: 1,
          postsCount: 1,
        },
        $set: { updatedAt: now },
      },
    )

    return NextResponse.json(
      {
        id: topicResult.insertedId.toString(),
        title,
        categoryId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating forum topic:", error)
    return NextResponse.json({ error: "Failed to create forum topic" }, { status: 500 })
  }
}
