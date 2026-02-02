import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Keep DOM + localStorage in sync with state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav className="w-full text-slate-900 dark:text-white border-b border-slate-200/70 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-10 py-4 md:py-6">
        <Link to="/">
          <h1 className="text-lg md:text-2xl font-semibold tracking-[0.18em]">
            PIXELIZE
          </h1>
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="relative flex items-center justify-between w-[78px] md:w-[92px] rounded-full px-2 py-2 md:py-3
              bg-slate-100 dark:bg-white/10
              border border-slate-300 dark:border-white/25
              shadow-sm dark:shadow-md dark:shadow-black/40 hover:shadow dark:hover:shadow-lg dark:hover:shadow-black/50
              transition outline-none"
            aria-label="Toggle dark mode"
          >
            {/* slider */}
            <div
              className={`absolute left-1 top-1/2 h-[calc(100%-8px)] w-[calc(50%-6px)] -translate-y-1/2 rounded-full
                bg-white dark:bg-main-color shadow
                transition-transform duration-300
                ${darkMode ? "translate-x-[calc(100%+2px)]" : "translate-x-0"}`}
            />

            <span className="relative z-10 text-slate-700 dark:text-white">
              <BsSun className="translate-x-[3px] md:translate-x-[6px]" />
            </span>

            <span className="relative z-10 text-slate-700 dark:text-white">
              <BsMoon className="translate-x-[-3px] md:translate-x-[-6px]" />
            </span>
          </button>

          <ProfileIcon />
        </div>
      </div>
    </nav>
  );
};
 