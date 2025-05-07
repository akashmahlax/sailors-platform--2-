import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ship, Globe, Users, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <Badge className="mb-4 bg-ocean-100 text-ocean-800 hover:bg-ocean-200">About Us</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-ocean-800 md:text-5xl">
          Connecting Maritime Professionals Worldwide
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Sailor's Platform is dedicated to building a global community for maritime professionals to share knowledge,
          experiences, and resources that enhance safety and efficiency at sea.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-ocean-800">Our Mission</h2>
          <p className="mb-4 text-muted-foreground">
            We believe that the collective wisdom of maritime professionals can transform the industry. Our mission is
            to create a platform where sailors, officers, engineers, and shore staff can connect, share insights, and
            support each other.
          </p>
          <p className="mb-6 text-muted-foreground">
            By fostering this community, we aim to improve safety standards, promote sustainable practices, and enhance
            the quality of life for all maritime professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-ocean-600 hover:bg-ocean-700">Join Our Community</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=800&width=600&text=Maritime+Professionals"
            alt="Maritime professionals collaborating"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-ocean-800">Our Core Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-ocean-100 p-3">
                <Ship className="h-6 w-6 text-ocean-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Safety First</h3>
              <p className="text-muted-foreground">
                We prioritize safety in all discussions and resources, promoting best practices that save lives at sea.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-ocean-100 p-3">
                <Globe className="h-6 w-6 text-ocean-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Global Perspective</h3>
              <p className="text-muted-foreground">
                We embrace diversity of experience from maritime professionals across all regions and sectors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-ocean-100 p-3">
                <Users className="h-6 w-6 text-ocean-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Community Support</h3>
              <p className="text-muted-foreground">
                We foster a supportive environment where professionals can seek advice and share challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-ocean-800">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              name: "Captain James Wilson",
              role: "Founder & CEO",
              bio: "Former merchant navy captain with 25 years of experience",
              image: "/placeholder.svg?height=400&width=400&text=Captain+James",
            },
            {
              name: "Dr. Sarah Chen",
              role: "Maritime Safety Director",
              bio: "Maritime safety expert with a PhD in Risk Management",
              image: "/placeholder.svg?height=400&width=400&text=Dr+Sarah",
            },
            {
              name: "Engineer Michael Rodriguez",
              role: "Technical Director",
              bio: "Chief Engineer with expertise in sustainable maritime technologies",
              image: "/placeholder.svg?height=400&width=400&text=Engineer+Michael",
            },
            {
              name: "Lisa Nakamura",
              role: "Community Manager",
              bio: "Former navigation officer passionate about building maritime communities",
              image: "/placeholder.svg?height=400&width=400&text=Lisa",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-ocean-600">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16 rounded-lg bg-ocean-50 p-8">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-700">12,500+</div>
            <p className="mt-2 text-muted-foreground">Active Members</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-700">85+</div>
            <p className="mt-2 text-muted-foreground">Countries Represented</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-700">45,000+</div>
            <p className="mt-2 text-muted-foreground">Resources Shared</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-ocean-700">120+</div>
            <p className="mt-2 text-muted-foreground">Maritime Companies</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-ocean-800">What Our Members Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Sailor's Platform has been invaluable for connecting with other captains and sharing best practices for navigating challenging waters.",
              author: "Captain Thomas Reynolds",
              role: "Cruise Ship Captain",
              image: "/placeholder.svg?height=100&width=100&text=Thomas",
            },
            {
              quote:
                "The resources and support I've found here have helped me advance my maritime career and stay updated on industry changes.",
              author: "Elena Petrova",
              role: "Second Officer",
              image: "/placeholder.svg?height=100&width=100&text=Elena",
            },
            {
              quote:
                "As a maritime engineer, the technical discussions and problem-solving community here have been incredibly valuable.",
              author: "Robert Kim",
              role: "Chief Engineer",
              image: "/placeholder.svg?height=100&width=100&text=Robert",
            },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="mb-4 text-ocean-600">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-ocean-700 p-8 text-white">
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Ready to Join Our Maritime Community?</h2>
            <p className="mt-2 text-ocean-100">Connect with thousands of maritime professionals worldwide.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white text-ocean-700 hover:bg-ocean-100">Sign Up Now</Button>
            <Button variant="outline" className="border-white text-white hover:bg-ocean-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
