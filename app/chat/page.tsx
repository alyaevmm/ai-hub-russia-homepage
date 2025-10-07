"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  MessageSquarePlus,
  Search,
  Settings,
  CreditCard,
  User,
  Send,
  Copy,
  StopCircle,
  Download,
  Menu,
  X,
  Check,
  ArrowLeft,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

export default function ChatPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Mock chats data
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      title: "Как создать React компонент?",
      lastMessage: "Для создания React компонента...",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Объясни квантовую физику",
      lastMessage: "Квантовая физика изучает...",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Помоги с дизайном",
      lastMessage: "Для создания хорошего дизайна...",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      title: "Планирование проекта",
      lastMessage: "Начнем с определения целей...",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-open sidebar on desktop, close on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    handleResize() // Set initial state
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Это моковый ответ на ваш вопрос: "${userMessage.content}". В реальном приложении здесь будет ответ от AI модели.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsGenerating(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleStop = () => {
    setIsGenerating(false)
  }

  const handleExport = (format: "txt" | "pdf") => {
    const content = messages.map((m) => `${m.role === "user" ? "Пользователь" : "AI"}: ${m.content}`).join("\n\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-export.${format}`
    a.click()
  }

  const filteredChats = chats.filter((chat) => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!user) return null

  return (
    <div className="flex h-screen bg-background md:pt-20">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0",
          "md:relative absolute inset-y-0 left-0 z-50",
          !sidebarOpen && "md:w-0"
        )}
      >
        <div className={cn("flex flex-col h-full", !sidebarOpen && "hidden")}>
          {/* New Chat Button */}
          <div className="p-4 border-b">
            <Button className="w-full justify-start gap-2" onClick={() => setMessages([])}>
              <MessageSquarePlus className="h-4 w-4" />
              Новый чат
            </Button>
          </div>

          {/* Chats List */}
          <ScrollArea className="flex-1 px-4">
            <div className="py-4 space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Мои чаты</h3>
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left p-2 rounded-lg hover:bg-accent transition-colors text-sm truncate"
                >
                  {chat.title}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Search */}
          <div className="p-4 border-t space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по чатам"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Bottom Links */}
          <div className="p-4 border-t space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push("/dashboard")}>
              <Settings className="h-4 w-4" />
              Настройки
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push("/dashboard")}>
              <CreditCard className="h-4 w-4" />
              Тарифы
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push("/dashboard")}>
              <User className="h-4 w-4" />
              Профиль
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile back button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.push('/dashboard')}
              className="md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            {/* Mobile sidebar toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Desktop sidebar toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <h1 className="text-lg font-semibold">AI Assistant</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("txt")}>
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquarePlus className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Начните работу с AI</h2>
                <p className="text-muted-foreground max-w-md">
                  Задайте любой вопрос или начните диалог с искусственным интеллектом
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-sm font-semibold">AI</span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg p-4 max-w-[80%]",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(message.content, message.id)}>
                          {copiedId === message.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isGenerating && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground text-sm font-semibold">AI</span>
                </div>
                <div className="rounded-lg p-4 bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите ваш вопрос... (Enter для отправки, Shift+Enter для новой строки)"
                className="min-h-[60px] max-h-[200px] resize-none"
                disabled={isGenerating}
              />
              <div className="flex flex-col gap-2">
                {isGenerating ? (
                  <Button size="icon" variant="destructive" onClick={handleStop}>
                    <StopCircle className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI может допускать ошибки. Проверяйте важную информацию.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
