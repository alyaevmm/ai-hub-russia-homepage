"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration - save to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false
    }

    const newUser = { email, password, name }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const userData = { email, name }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
