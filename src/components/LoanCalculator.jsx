"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

// Currency symbols
const currencySymbols = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
};

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTerm, setLoanTerm] = useState("5");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/37b52c9eb9ad523713949ef8/latest/USD"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
        setError("Failed to load exchange rates. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  // Calculate loan details
  const calculateLoan = () => {
    const principal = Number.parseFloat(loanAmount);
    const rate = Number.parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const time = Number.parseFloat(loanTerm) * 12; // Total months

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      return;
    }

    // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const x = Math.pow(1 + rate, time);
    const monthly = (principal * rate * x) / (x - 1);
    setMonthlyPayment(monthly);

    // Generate amortization schedule
    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= time; i++) {
      const interest = balance * rate;
      const principalPaid = monthly - interest;
      balance -= principalPaid;

      schedule.push({
        month: i,
        principalPaid: principalPaid,
        interest: interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setAmortizationSchedule(schedule);
  };

  // Reset the table
  const resetTable = () => {
    setMonthlyPayment(null);
    setAmortizationSchedule([]);
  };

  // Format currency
  const formatCurrency = (value) => {
    return value.toFixed(2);
  };

  // Convert currency if exchange rates are available
  const convertCurrency = (value) => {
    if (!exchangeRates || selectedCurrency === "USD") {
      return value;
    }
    return value * exchangeRates[selectedCurrency];
  };

  // Helper function to conditionally join class names
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark" ? "bg-gray-900" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-semibold  mb-5 text-gray-900 dark:text-white">
          Loan Calculator Dashboard
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <fieldset
            className={cn(
              "w-full p-2 border rounded-md",
              theme === "dark"
                ? "border-gray-700 text-white"
                : "border-gray-300 text-gray-900"
            )}
          >
            <legend
              className={cn(
                "text-sm px-1",
                theme === "dark" ? "text-white" : "text-gray-700"
              )}
            >
              Loan Amount
            </legend>
            <input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className={cn(
                "w-full outline-none px-2 py-1 bg-transparent",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            />
          </fieldset>

          <fieldset
            className={cn(
              "w-full p-2 border rounded-md",
              theme === "dark"
                ? "border-gray-700 text-white"
                : "border-gray-300 text-gray-900"
            )}
          >
            <legend
              className={cn(
                "text-sm px-1",
                theme === "dark" ? "text-white" : "text-gray-700"
              )}
            >
              Interest Rate (%)
            </legend>
            <input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className={cn(
                "w-full outline-none px-2 py-1 bg-transparent",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            />
          </fieldset>

          <fieldset
            className={cn(
              "w-full p-2 border rounded-md",
              theme === "dark"
                ? "border-gray-700 text-white"
                : "border-gray-300 text-gray-900"
            )}
          >
            <legend
              className={cn(
                "text-sm px-1",
                theme === "dark" ? "text-white" : "text-gray-700"
              )}
            >
              Term (Years)
            </legend>
            <input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className={cn(
                "w-full outline-none px-2 py-1 bg-transparent",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            />
          </fieldset>
        </div>

        <button
          onClick={calculateLoan}
          className={cn(
            "px-4 py-2 rounded text-white mb-6",
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          )}
        >
          CALCULATE
        </button>

        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {monthlyPayment !== null && (
          <div className="space-y-6">
            <h3
              className={cn(
                "text-xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}
            >
              Monthly EMI: {currencySymbols[selectedCurrency]}
              {formatCurrency(convertCurrency(monthlyPayment))}
            </h3>

            <div className="flex justify-between items-center">
            <fieldset
  className={cn(
    "relative w-[90px] px-2 py-1 border rounded-md text-sm",
    theme === "dark" ? "border-gray-700 text-white" : "border-gray-400 text-black"
  )}
>
  <legend
    className={cn(
      "text-xs px-1",
      theme === "dark" ? "text-white" : "text-gray-700"
    )}
>
    Currency
  </legend>

  <button
    type="button"
    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
    className={cn(
      "w-full flex justify-between items-center text-base font-medium",
      theme === "dark" ? "bg-gray-800 text-white" : "text-black"
    )}
  >
    {selectedCurrency}
    <svg
      className="h-4 w-4 ml-1"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
    </svg>
  </button>

  {showCurrencyDropdown && (
    <div
      className={cn(
        "absolute top-full mt-1 left-0 right-0 z-10 rounded shadow-md",
        theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"
      )}
    >
      {Object.keys(currencySymbols).map((currency) => (
        <button
          key={currency}
          onClick={() => {
            setSelectedCurrency(currency)
            setShowCurrencyDropdown(false)
          }}
          className={cn(
            "block w-full text-left px-3 py-1",
            theme === "dark" ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {currency}
        </button>
      ))}
    </div>
  )}
</fieldset>


              <button
                onClick={resetTable}
                className={cn(
                  "px-4 py-2 rounded border-2",
                  theme === "dark"
                    ? "border-purple-500 text-purple-400 hover:bg-purple-900 hover:text-purple-300"
                    : "border-purple-500 text-purple-600 hover:bg-purple-100"
                )}
              >
                RESET TABLE
              </button>
            </div>

            <div
              className={cn(
                "rounded-md overflow-hidden",
                theme === "dark" ? "bg-gray-800" : "bg-white border"
              )}
            >
              <h3
                className={cn(
                  "p-4 text-lg font-bold",
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
                )}
              >
                Amortization Schedule ({selectedCurrency})
              </h3>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead
                    className={
                      theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50"
                    }
                  >
                    <tr>
                      <th className="p-3 text-left">Month</th>
                      <th className="p-3 text-right">Principal</th>
                      <th className="p-3 text-right">Interest</th>
                      <th className="p-3 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className={theme === "dark" ? "text-white" : ""}>
                    {amortizationSchedule.map((row) => (
                      <tr
                        key={row.month}
                        className={cn(
                          "border-t",
                          theme === "dark"
                            ? "border-gray-700 hover:bg-gray-700"
                            : "hover:bg-gray-50"
                        )}
                      >
                        <td className="p-3">{row.month}</td>
                        <td className="p-3 text-right">
                          {formatCurrency(convertCurrency(row.principalPaid))}
                        </td>
                        <td className="p-3 text-right">
                          {formatCurrency(convertCurrency(row.interest))}
                        </td>
                        <td className="p-3 text-right">
                          {formatCurrency(convertCurrency(row.balance))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanCalculator;
