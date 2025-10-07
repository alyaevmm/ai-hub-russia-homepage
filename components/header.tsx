"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"RU" | "EN">("RU")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-blue-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-foreground">AI Hub Russia</span>
          </div>

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
            <button
              onClick={() => setLanguage(language === "RU" ? "EN" : "RU")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {language}
            </button>
            <Button variant="ghost">Войти</Button>
            <Button className="gradient-blue-purple">Регистрация</Button>
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
              <Button variant="ghost" className="w-full">
                Войти
              </Button>
              <Button className="w-full gradient-blue-purple">Регистрация</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
