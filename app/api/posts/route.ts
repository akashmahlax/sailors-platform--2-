import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, content, type, mediaUrl, isAnonymous, visibility, authorId, authorName, authorImage } =
      await request.json()

    // Validate input
    if ((!content || content.trim() === "") && !mediaUrl) {
      return NextResponse.json({ message: "Post must have content or media" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Create post
    const result = await db.collection("posts").insertOne({
      title,
      content,
      type,
      mediaUrl,
      isAnonymous,
      visibility,
      authorId: session.user.id, // Use the actual session user ID for security
      authorName: isAnonymous ? "Anonymous Sailor" : session.user.name,
      authorImage: isAnonymous ? null : session.user.image,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        message: "Post created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Post creation error:", error)
    return NextResponse.json({ message: "An error occurred while creating the post" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const type = searchParams.get("type")
    const authorId = searchParams.get("authorId")

    const client = await clientPromise
    const db = client.db()

    // Build query
    const query: any = {
      visibility: "public", // Default to only public posts
    }

    // Add filters if provided
    if (type) query.type = type
    if (authorId) query.authorId = authorId

    // Get posts with pagination
    const posts = await db
      .collection("posts")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection("posts").countDocuments(query)

    return NextResponse.json({
      posts: posts.map((post) => ({
        ...post,
        id: post._id.toString(),
        _id: undefined,
      })),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "An error occurred while fetching posts" }, { status: 500 })
  }
}
