import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db()

    const categories = await db.collection("forumCategories").find({}).toArray()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching forum categories:", error)
    return NextResponse.json({ error: "Failed to fetch forum categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, description, icon, color } = await request.json()

    // Validate input
    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("forumCategories").insertOne({
      name,
      description,
      icon: icon || "MessageCircle",
      color: color || "blue",
      topicsCount: 0,
      postsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        name,
        description,
        icon: icon || "MessageCircle",
        color: color || "blue",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating forum category:", error)
    return NextResponse.json({ error: "Failed to create forum category" }, { status: 500 })
  }
}
