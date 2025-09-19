// import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useSidebar } from "./sidebar";
import { Button } from "./button";
import { cn, THEME_COOKIE_NAME } from "@/lib/utils";

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const TOGGLE_CLASSES =
  "text-sm font-medium flex justify-center items-center gap-2 px-4 md:pl-3 md:pr-3.5 py-0.5 transition-colors relative z-10";

export const ThemeSliderToggle = () => {
  // const [isDark, setIsDark] = useState(false);
  const { state, isDark, setIsDark } = useSidebar();
  const collapsed = state === "collapsed";

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

     // This sets the cookie to keep the theme state.
      document.cookie = `${THEME_COOKIE_NAME}=${newIsDark ? "dark" : "light"}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
  };

  // const isDarkMode = document.documentElement.classList.contains("dark");
  // console.log(isDarkMode, "is dak mode")
  // useEffect(() => {
  //   setIsDark(isDarkMode);
  // }, []);

  if (collapsed)
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className={cn(
            "flex items-center gap-2 p-2 rounded-lg transition-colors",
            !collapsed ? "flex-1" : "w-full"
          )}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {!collapsed && (
            <span className="text-sm">{isDark ? "Light" : "Dark"}</span>
          )}
        </Button>
      </div>
    );

  return (
    // <div className="relative flex w-fit h-[35px] bg-sidebar-theme-toggle-body items-center py-1.5 px-4 rounded-full border border-red-300">
    <div className="relative flex w-fit h-[35px] bg-foreground/10 items-center py-1.5 px-4 rounded-full border border-foreground/10">
      <button
        className={`${TOGGLE_CLASSES} `}
        onClick={() => {
          toggleTheme();
        }}
      >
        <Sun className="relative h-4 w-4 z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} `}
        onClick={() => {
          toggleTheme();
        }}
      >
        <Moon className="relative h-4 w-4 z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex justify-start dark:justify-end `}
      >
        <span
          // layout
          // transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-background p-1 border-2 border-foreground/10"
        />
      </div>
    </div>
  );
};
