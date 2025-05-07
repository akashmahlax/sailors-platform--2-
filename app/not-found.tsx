import Link from "next/link"
import { Ship, Compass, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-ocean-100">
        <Ship className="h-16 w-16 text-ocean-600" />
        <div className="absolute -right-4 -top-4 rounded-full bg-ocean-200 p-3">
          <Compass className="h-6 w-6 animate-spin text-ocean-700" style={{ animationDuration: "10s" }} />
        </div>
      </div>

      <h1 className="mb-2 text-4xl font-bold text-ocean-800 md:text-5xl lg:text-6xl">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-ocean-700 md:text-3xl">Lost at Sea</h2>

      <p className="mb-8 max-w-md text-muted-foreground">
        The page you're looking for seems to have drifted away. Perhaps it's been carried off by the tide or never
        existed in these waters.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="lg" className="bg-ocean-600 hover:bg-ocean-700" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shore
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="border-ocean-200 hover:bg-ocean-100" asChild>
          <Link href="/support">Request Assistance</Link>
        </Button>
      </div>

      <div className="mt-12 flex animate-pulse flex-col items-center text-sm text-muted-foreground">
        <p>Coordinates: 404°N, 404°W</p>
        <p>Maritime Chart: Not Found</p>
      </div>
    </div>
  )
}
