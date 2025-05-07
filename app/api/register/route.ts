import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    try {
      const user = await registerUser({ name, email, password })
      return NextResponse.json(user)
    } catch (error: any) {
      console.error("Registration error:", error)

      if (error.message === "User already exists") {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
      }

      if (error.message === "Database connection error") {
        return NextResponse.json({ error: "Database connection error. Please try again later." }, { status: 500 })
      }

      return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
    }
  } catch (error) {
    console.error("Registration request error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
