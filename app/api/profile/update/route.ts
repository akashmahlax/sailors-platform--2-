import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const data = await request.json()

    // Validate the data
    const { name, bio, position, experience, location, socialLinks } = data

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Update user profile
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name,
          bio: bio || "",
          position: position || "",
          experience: experience || "",
          location: location || "",
          socialLinks: socialLinks || {},
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "An error occurred while updating the profile" }, { status: 500 })
  }
}
