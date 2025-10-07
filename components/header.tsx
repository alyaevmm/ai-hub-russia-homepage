"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  
  // Hide header completely when in chat page
  const isChatPage = pathname === '/chat'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 glass ${isChatPage ? 'hidden' : ''}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-blue-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-foreground">AI Hub Russia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Главная
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Тарифы
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              О нас
            </a>
            <a href="#support" className="text-foreground hover:text-primary transition-colors">
              Поддержка
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="bg-muted/30 hover:bg-muted/50">
                    Дашборд
                  </Button>
                </Link>
                <Button variant="outline" className="bg-muted/30 hover:bg-muted/50" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="bg-muted/30 hover:bg-muted/50">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="gradient-blue-purple">Регистрация</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Главная
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
                Тарифы
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                О нас
              </a>
              <a href="#support" className="text-foreground hover:text-primary transition-colors">
                Поддержка
              </a>
            </nav>
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full bg-muted/30 hover:bg-muted/50">
                      Дашборд
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-muted/30 hover:bg-muted/50" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-muted/30 hover:bg-muted/50">
                      Войти
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full gradient-blue-purple">Регистрация</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
