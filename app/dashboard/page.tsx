"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquarePlus, History, CreditCard, Settings, Bot, Clock } from "lucide-react"

const MOCK_DATA = {
  tokensUsed: 1250,
  tokensLimit: 10000,
  activeChats: 3,
  currentPlan: "Базовый",
  recentChats: [
    { id: 1, title: "Как создать React компонент?", time: "2 часа назад" },
    { id: 2, title: "Объясни квантовую физику", time: "вчера" },
    { id: 3, title: "Помоги с дизайном", time: "3 дня назад" },
  ],
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [hasChats, setHasChats] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Добро пожаловать, {user.name}!</h1>
            <p className="text-lg text-muted-foreground">Ваш персональный AI-ассистент</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => router.push("/chat")}
            >
              <MessageSquarePlus className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-center">Новый чат</span>
            </Card>

            <Card
              className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => router.push("/chat")}
            >
              <History className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-center">История чатов</span>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all cursor-pointer group">
              <CreditCard className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-center">Тарифы</span>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all cursor-pointer group">
              <Settings className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-center">Настройки</span>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Использовано токенов</div>
              <div className="text-3xl font-bold text-foreground mb-1">{MOCK_DATA.tokensUsed.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">/ {MOCK_DATA.tokensLimit.toLocaleString()}</div>
              <div className="mt-3 w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(MOCK_DATA.tokensUsed / MOCK_DATA.tokensLimit) * 100}%` }}
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Активных чатов</div>
              <div className="text-3xl font-bold text-foreground">{MOCK_DATA.activeChats}</div>
            </Card>

            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Текущий тариф</div>
              <div className="text-3xl font-bold text-foreground">{MOCK_DATA.currentPlan}</div>
            </Card>
          </div>

          {hasChats ? (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Последние чаты</h2>
              <div className="space-y-3">
                {MOCK_DATA.recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => router.push("/chat")}
                  >
                    <MessageSquarePlus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{chat.title}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      {chat.time}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Начните работу с AI</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Создайте свой первый чат и откройте возможности искусственного интеллекта
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => router.push("/chat")}>
                Создать первый чат
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
