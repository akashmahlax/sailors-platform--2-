import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function MaritimeNews() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-ocean-700" />
          <h2 className="text-2xl font-bold text-ocean-800">Maritime News</h2>
        </div>
        <Link href="/news" className="text-sm font-medium text-ocean-600 hover:underline">
          View All News
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">New Port Regulations in Singapore</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Singapore Maritime Authority announces updated berthing procedures effective next month.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Maritime Times</span>
              <span>•</span>
              <span>2 hours ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">Mediterranean Shipping Routes Affected by Storms</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Severe weather systems causing delays and route changes for vessels in the region.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Nautical News Network</span>
              <span>•</span>
              <span>5 hours ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">IMO Announces New Safety Standards</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              International Maritime Organization updates safety protocols for cargo vessels.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Global Shipping Review</span>
              <span>•</span>
              <span>1 day ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
