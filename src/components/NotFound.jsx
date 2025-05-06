import { Link } from "react-router-dom"
import { useTheme } from "../components/ThemeProvider"

 function NotFound() {
  const { theme } = useTheme()

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <h3 className="text-3xl font-semibold mb-6">Page Not Found</h3>
        <p className="mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className={`px-4 py-2 rounded ${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}


export default NotFound