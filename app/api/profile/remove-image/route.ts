import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Delete from Cloudinary if needed
    try {
      await cloudinary.uploader.destroy(`sailor-profiles/user-${userId}`)
    } catch (cloudinaryError) {
      console.error("Cloudinary delete error:", cloudinaryError)
      // Continue even if Cloudinary delete fails
    }

    // Update user profile to remove image URL
    const client = await clientPromise
    const db = client.db()

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          image: null,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ message: "Profile image removed successfully" }, { status: 200 })
  } catch (error) {
    console.error("Image removal error:", error)
    return NextResponse.json({ message: "An error occurred while removing the profile image" }, { status: 500 })
  }
}
