"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Anchor, Ship, Compass } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Welcome to the Sailor's Platform",
    subtitle:
      "Connect with maritime professionals, access resources, and stay updated with the latest news from across the seven seas.",
    image: "/placeholder.svg?height=800&width=1600&text=Maritime+Community",
    cta: {
      primary: {
        text: "Join the Community",
        link: "/signup",
      },
      secondary: {
        text: "Explore Resources",
        link: "/resources",
      },
    },
    color: "from-blue-900/80 to-blue-700/80",
  },
  {
    id: 2,
    title: "Share Your Maritime Knowledge",
    subtitle: "Contribute to our growing repository of maritime expertise through blogs, forums, and resource sharing.",
    image: "/placeholder.svg?height=800&width=1600&text=Knowledge+Sharing",
    cta: {
      primary: {
        text: "Start Writing",
        link: "/blog/create",
      },
      secondary: {
        text: "Browse Content",
        link: "/chronicles",
      },
    },
    color: "from-teal-900/80 to-teal-700/80",
  },
  {
    id: 3,
    title: "Stay Safe at Sea",
    subtitle: "Access real-time weather alerts, safety guidelines, and emergency protocols for maritime operations.",
    image: "/placeholder.svg?height=800&width=1600&text=Maritime+Safety",
    cta: {
      primary: {
        text: "View Weather Alerts",
        link: "/weather",
      },
      secondary: {
        text: "Safety Resources",
        link: "/resources/safety",
      },
    },
    color: "from-red-900/80 to-red-700/80",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Image Slides */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={heroSlides[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image || "/placeholder.svg"}
              alt={heroSlides[currentSlide].title}
              fill
              priority
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].color}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[currentSlide].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-white"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{heroSlides[currentSlide].title}</h1>
            <p className="mb-8 text-lg md:text-xl">{heroSlides[currentSlide].subtitle}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-ocean-500 hover:bg-ocean-600 text-white" asChild>
                <Link href={heroSlides[currentSlide].cta.primary.link}>
                  {heroSlides[currentSlide].cta.primary.text}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                <Link href={heroSlides[currentSlide].cta.secondary.link}>
                  {heroSlides[currentSlide].cta.secondary.text}
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute bottom-12 left-12 hidden animate-bounce md:block">
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
          <Ship className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute right-12 top-12 hidden animate-pulse md:block">
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
          <Compass className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-24 right-24 hidden animate-bounce md:block">
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
          <Anchor className="h-6 w-6 text-white" />
        </div>
      </div>
    </section>
  )
}
