import React from 'react';
import { useTheme } from './ThemeProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const cn = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <header
      className={cn(
        "p-4 flex justify-between items-center",
        theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      )}
    >
      <h1 className="text-xl font-bold">Loan Calculator</h1>
      <div className="flex items-center space-x-4">
        <Link to="/">
          <button className="px-4 py-2 rounded text-sm bg-inherit border border-white">
            HOME
          </button>
        </Link>
        <Link to="/exchange">
          <button className="px-4 py-2 rounded text-sm bg-inherit border border-white">
            EXCHANGE RATES
          </button>
        </Link>
        <Link to="/about">
          <button className="px-4 py-2 rounded text-sm bg-inherit border border-white">
            ABOUT
          </button>
        </Link>
        <Link to="/error">
          <button className="px-4 py-2 rounded text-sm bg-inherit border border-white">
            ERROR PAGE
          </button>
        </Link>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <div
            className={cn(
              "w-11 h-6 rounded-full peer transition-colors",
              theme === "dark"
                ? "bg-blue-600 peer-checked:bg-blue-300"
                : "bg-gray-200 peer-checked:bg-blue-600"
            )}
          ></div>
          <div
            className={cn(
              "absolute w-4 h-4 rounded-full bg-white transition-all",
              theme === "dark" ? "left-6" : "left-1"
            )}
          ></div>
        </label>
      </div>
    </header>
  );
};

export default Navbar;
