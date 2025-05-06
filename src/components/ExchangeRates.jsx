"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./ThemeProvider"

 function ExchangeRates() {
  const [rates, setRates] = useState(null)
  const [baseCurrency, setBaseCurrency] = useState("USD")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/37b52c9eb9ad523713949ef8/latest/${baseCurrency}`,
        )
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates")
        }
        const data = await response.json()
        setRates(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching exchange rates:", err)
        setError("Failed to load exchange rates. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchRates()
  }, [baseCurrency])

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value)
    setCurrentPage(1)
  }

  // Helper function to conditionally join class names
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  if (isLoading) {
    return (
      <div
        className={cn("min-h-screen flex items-center justify-center", theme === "dark" ? "bg-gray-900" : "bg-white")}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("min-h-screen p-6", theme === "dark" ? "bg-gray-900 text-white" : "bg-white")}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const currencies = rates ? Object.keys(rates.conversion_rates) : []
  const totalPages = Math.ceil(currencies.length / itemsPerPage)
  const currentCurrencies = currencies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className={cn("min-h-screen", theme === "dark" ? "bg-gray-900" : "bg-white")}>
     

      <div className="container mx-auto p-6">
        <h2 className={cn("text-3xl font-bold mb-6", theme === "dark" ? "text-white" : "text-gray-800")}>
          Live Exchange Rates
        </h2>

        <div className="mb-6">
          <label htmlFor="baseCurrency" className={cn("block mb-2", theme === "dark" ? "text-white" : "text-gray-700")}>
            Base Currency:
          </label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={handleCurrencyChange}
            className={cn(
              "w-full md:w-64 p-2 border rounded",
              theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "border-gray-300",
            )}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {rates && (
          <div className={cn("rounded-md overflow-hidden", theme === "dark" ? "bg-gray-800" : "bg-white border")}>
            <h3 className={cn("p-4 text-lg font-bold", theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100")}>
              {baseCurrency} Exchange Rates - Last Updated:{" "}
              {new Date(rates.time_last_update_unix * 1000).toLocaleString()}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50"}>
                  <tr>
                    <th className="p-3 text-left">Currency</th>
                    <th className="p-3 text-right">Rate</th>
                  </tr>
                </thead>
                <tbody className={theme === "dark" ? "text-white" : ""}>
                  {currentCurrencies.map((currency) => (
                    <tr
                      key={currency}
                      className={cn(
                        "border-t",
                        theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "hover:bg-gray-50",
                      )}
                    >
                      <td className="p-3">{currency}</td>
                      <td className="p-3 text-right">{rates.conversion_rates[currency]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex justify-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "px-3 py-1 rounded",
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300",
                  )}
                >
                  Previous
                </button>
                <span className={cn("px-3 py-1", theme === "dark" ? "text-white" : "")}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "px-3 py-1 rounded",
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300",
                  )}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExchangeRates