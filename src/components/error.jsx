"use client"

import { useEffect } from "react"
import { useTheme } from "@/components/ThemeProvider"

export default function Error({ error, reset }) {
  const { theme } = useTheme()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-6">We apologize for the inconvenience. An error has occurred.</p>
        <button
          onClick={() => reset()}
          className={`px-4 py-2 rounded ${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
