import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const THEME_COOKIE_NAME = "theme:state";
export const SIDEBAR_COOKIE_NAME = "sidebar:state";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCookieValue = (name: string): string | null => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());

  // Find the specific cookie
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  if (!cookie) {
    return null;
  }

  // Extract the value after '=' and handle potential encoding issues
  const cookieValue = cookie.split("=")[1];

  return cookieValue || null;
};


export const getBrowserDarkModeThemePreference = ()=>{
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

return prefersDarkScheme.matches ? true : false
} 