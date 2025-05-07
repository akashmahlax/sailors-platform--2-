import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/db"
import { compare, hash } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const client = await clientPromise
          const db = client.db()
          const user = await db.collection("users").findOne({ email: credentials.email.toLowerCase() })

          if (!user) {
            console.log("User not found:", credentials.email)
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password)

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email)
            return null
          }

          console.log("User authenticated successfully:", credentials.email)

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || "user",
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}

export async function registerUser(userData: {
  name: string
  email: string
  password: string
}) {
  try {
    const client = await clientPromise
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: userData.email.toLowerCase() })
    if (existingUser) {
      throw new Error("User already exists")
    }

    // Hash password
    const hashedPassword = await hash(userData.password, 12)

    // Create user
    const result = await db.collection("users").insertOne({
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      image: null,
      role: userData.email.includes("dileep_14") ? "admin" : "user", // Auto-assign admin role for demo
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return {
      id: result.insertedId.toString(),
      name: userData.name,
      email: userData.email,
    }
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}
