import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudLightning } from "lucide-react"
import FeaturedPosts from "@/components/featured-posts"
import LatestPodcasts from "@/components/latest-podcasts"
import MaritimeNews from "@/components/maritime-news"
import HeroCarousel from "@/components/hero-carousel"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Weather Alerts */}
      <section className="py-8">
        <div className="container px-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudLightning className="h-6 w-6 text-ocean-700" />
              <h2 className="text-2xl font-bold text-ocean-800">Critical Weather Alerts</h2>
            </div>
            <Link href="/weather" className="text-sm font-medium text-ocean-600 hover:underline">
              View All Alerts
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="weather-alert-north-atlantic overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">North Atlantic</h3>
                  <Badge variant="destructive">Storm Warning</Badge>
                </div>
                <p className="mt-2 text-sm">
                  Severe storm system developing with winds exceeding 50 knots. Expected to impact shipping lanes within
                  24 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="weather-alert-mediterranean overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">Mediterranean</h3>
                  <Badge className="bg-amber-500">Fog Advisory</Badge>
                </div>
                <p className="mt-2 text-sm">
                  Dense fog reported in the Strait of Gibraltar. Visibility reduced to less than 0.5 nautical miles.
                </p>
              </CardContent>
            </Card>

            <Card className="weather-alert-south-china-sea overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">South China Sea</h3>
                  <Badge variant="destructive">Typhoon Warning</Badge>
                </div>
                <p className="mt-2 text-sm">
                  Typhoon approaching with sustained winds of 85 knots. All vessels advised to seek shelter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-8 bg-gray-50">
        <div className="container px-4">
          <FeaturedPosts />
        </div>
      </section>

      {/* Latest Podcasts */}
      <section className="py-8">
        <div className="container px-4">
          <LatestPodcasts />
        </div>
      </section>

      {/* Maritime News */}
      <section className="py-8 bg-gray-50">
        <div className="container px-4">
          <MaritimeNews />
        </div>
      </section>
    </div>
  )
}
