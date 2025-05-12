import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuth0 } from "@auth0/auth0-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isLibrarian() {
  const { user } = useAuth0();
  if (user?.["http://localhost:3000/roles"]?.includes("librarian")) {
    return true;
  }
  return false;
}

export function normalizeEmail(email: string) {
  return email?.trim().toLowerCase().normalize();
}