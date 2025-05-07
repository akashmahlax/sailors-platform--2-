"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Cloud, CloudRain, Sun, Wind, Loader2 } from "lucide-react"

export default function WeatherPage() {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (!location.trim()) return

    setIsLoading(true)
    setError("")

    // Simulate weather API call
    setTimeout(() => {
      // Mock weather data
      const mockWeather = {
        location: location,
        temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
        condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
        windSpeed: Math.floor(Math.random() * 30) + 5, // 5-35 km/h
        forecast: [
          {
            day: "Tomorrow",
            temperature: Math.floor(Math.random() * 30) + 10,
            condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)],
          },
          {
            day: "Day after tomorrow",
            temperature: Math.floor(Math.random() * 30) + 10,
            condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)],
          },
          {
            day: "In 3 days",
            temperature: Math.floor(Math.random() * 30) + 10,
            condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)],
          },
        ],
      }

      setWeather(mockWeather)
      setIsLoading(false)
    }, 1500)
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "Cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "Rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "Windy":
        return <Wind className="h-8 w-8 text-teal-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Maritime Weather</h1>
      <div className="mx-auto max-w-2xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check Weather Conditions</CardTitle>
            <CardDescription>Enter a location to get current weather and forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                placeholder="Enter port or maritime location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        {weather && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Weather in {weather.location}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getWeatherIcon(weather.condition)}
                    <div>
                      <p className="text-2xl font-bold">{weather.temperature}°C</p>
                      <p className="text-muted-foreground">{weather.condition}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Cloud className="h-4 w-4 text-muted-foreground" />
                      <p>Humidity: {weather.humidity}%</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-muted-foreground" />
                      <p>Wind: {weather.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="rounded-lg border p-4 text-center">
                      <p className="mb-2 font-medium">{day.day}</p>
                      <div className="flex justify-center">{getWeatherIcon(day.condition)}</div>
                      <p className="mt-2 text-xl font-bold">{day.temperature}°C</p>
                      <p className="text-sm text-muted-foreground">{day.condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!weather && !isLoading && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Cloud className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No weather data</h3>
            <p className="text-muted-foreground">Search for a location to see weather information</p>
          </div>
        )}
      </div>
    </div>
  )
}
