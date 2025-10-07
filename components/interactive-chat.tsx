"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Привет! Я AI Hub Russia. Чем могу помочь? У вас есть 5 бесплатных запросов.",
    },
  ])
  const [input, setInput] = useState("")
  const [requestCount, setRequestCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const maxRequests = 5
  const remainingRequests = maxRequests - requestCount

  const handleSend = async () => {
    if (!input.trim() || requestCount >= maxRequests || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setRequestCount((prev) => prev + 1)

    // Simulate AI response
    setTimeout(
      () => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateResponse(userMessage.content),
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const generateResponse = (userInput: string): string => {
    const responses = [
      "Отличный вопрос! AI Hub Russia предоставляет доступ к лучшим российским и международным моделям ИИ. Мы поддерживаем GigaChat, YandexGPT, ChatGPT, Claude и многие другие модели.",
      "Я могу помочь вам с различными задачами: написание текстов, анализ данных, генерация кода, перевод и многое другое. Все модели доступны через единый API.",
      "С AI Hub Russia вы получаете доступ к передовым технологиям ИИ по доступным ценам. Начните с бесплатного тарифа и масштабируйтесь по мере роста ваших потребностей.",
      "Наша платформа обеспечивает высокую скорость ответов и 99.9% uptime. Все данные защищены и обрабатываются в соответствии с российским законодательством.",
      "Вы можете интегрировать наш API в любое приложение за несколько минут. Мы предоставляем подробную документацию и примеры кода для всех популярных языков программирования.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-4 h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3" />
          <span>
            Осталось запросов: <span className="font-bold text-primary">{remainingRequests}</span>
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div
              className={`rounded-2xl p-4 max-w-[85%] ${
                message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "glass rounded-tl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {message.role === "user" && <div className="w-8 h-8 rounded-full gradient-blue-purple flex-shrink-0" />}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="glass rounded-2xl rounded-tl-none p-4">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="space-y-2">
        {requestCount >= maxRequests && (
          <div className="text-xs text-center text-muted-foreground bg-muted/50 rounded-lg p-2">
            Вы использовали все бесплатные запросы.{" "}
            <button className="text-primary hover:underline font-medium">Зарегистрируйтесь</button> для продолжения.
          </div>
        )}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={requestCount >= maxRequests ? "Лимит запросов исчерпан" : "Напишите ваш вопрос..."}
            disabled={requestCount >= maxRequests || isLoading}
            className="flex-1 bg-background/50 border-border"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || requestCount >= maxRequests || isLoading}
            size="icon"
            className="gradient-blue-purple"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
