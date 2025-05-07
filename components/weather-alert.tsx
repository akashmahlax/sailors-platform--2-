"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WeatherAlert() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert
      variant="destructive"
      className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-800"
    >
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <div className="ml-3 flex-1">
          <AlertTitle>Weather Alert: Severe Storm Warning</AlertTitle>
          <AlertDescription>
            A severe storm system is developing in the North Atlantic. Vessels in the area should take precautions.
            Check the weather section for detailed updates and safety recommendations.
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-600 hover:bg-amber-100 hover:text-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/40 dark:hover:text-amber-300"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </Alert>
  )
}
