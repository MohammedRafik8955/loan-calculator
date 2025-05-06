"use client"

import { useTheme } from "./ThemeProvider"

function About() {
  const { theme, setTheme } = useTheme()

  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div className={cn("min-h-screen", theme === "dark" ? "bg-gray-900" : "bg-white")}>
      <div className="container mx-auto p-6">
        <h2 className={cn("text-3xl font-bold mb-6", theme === "dark" ? "text-white" : "text-gray-800")}>
          About This Application
        </h2>

        <div
          className={cn(
            "rounded-md overflow-hidden p-6",
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white border",
          )}
        >
          <div className="space-y-6">
            <section>
              <h3 className="text-2xl font-bold mb-4">Purpose of This App</h3>
              <p className="mb-4">This project is designed to assess React development skills, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>React fundamentals (state, props, hooks)</li>
                <li>Component structure and code reusability</li>
                <li>Third-party API integration and live data rendering</li>
                <li>Working with tables, lists, and pagination</li>
                <li>Theme customization (dark/light mode toggle)</li>
                <li>Error handling and graceful UI fallbacks</li>
                <li>Responsive design and collapsible mobile header navigation</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Loan EMI calculation using standard financial formulas</li>
                <li>Dynamic amortization schedule table with monthly breakdown</li>
                <li>Real-time currency conversion of EMI using a live exchange rate API</li>
                <li>Paginated exchange rate table for 160+ currencies</li>
                <li>Dark/Light mode toggle for a customizable experience</li>
                <li>Collapsible header navigation on mobile screens</li>
                <li>Fully responsive UI</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">EMI Formula Used</h3>
              <p className="mb-2">The EMI (Equated Monthly Installment) is calculated using the standard formula:</p>
              <div className="bg-gray-100 text-gray-800 p-4 rounded">
                <p>EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]</p>
                <p className="mt-2">Where:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>P = Principal loan amount</li>
                  <li>R = Monthly interest rate (annual rate / 12 / 100)</li>
                  <li>N = Loan duration in months</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Currency Conversion API</h3>
              <p className="mb-2">
                This app integrates with the free tier of the ExchangeRate-API to fetch live exchange rates.
              </p>
              <p>
                The API endpoint used is:
                <code className="block bg-gray-100 text-gray-800 p-2 rounded mt-2">
                  https://v6.exchangerate-api.com/v6/API_KEY/latest/USD
                </code>
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">About the Developer</h3>
              <p className="mb-4">
                I'm <strong>Mohammed Rafik</strong>, a passionate and dedicated React.js developer with hands-on experience
                in building dynamic and responsive web applications. I specialize in developing user interfaces using
                <strong> React.js, Redux, and modern JavaScript (ES6+)</strong>. I’ve worked on real-world projects involving
                RESTful APIs, state management, form handling, routing, and performance optimization.
              </p>
              <p className="mb-4">
                This project was part of a task assigned by an organization, which I successfully completed to showcase my development skills.
                I'm eager to contribute to a team where I can apply my skills and continue growing as a developer.
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> rafikansari88888@gmail.com</li>
                <li><strong>Phone:</strong> 9081204480</li>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rafik-ansari-b0a4721b4/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">rafik-ansari</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/MohammedRafik8955" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">MohammedRafik8955</a></li>
                <li><strong>Portfolio:</strong> <a href="https://mohammedrafik-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mohammedrafik-portfolio</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
