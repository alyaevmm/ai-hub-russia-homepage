"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, Settings, CreditCard } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

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
          {/* Welcome Section */}
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Добро пожаловать, {user.name}!</h1>
            <p className="text-muted-foreground">Ваш персональный дашборд AI Hub Russia</p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-3 glass hover:border-primary/50 transition-all bg-transparent"
            >
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="font-semibold">Новый чат</span>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-3 glass hover:border-primary/50 transition-all bg-transparent"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
              <span className="font-semibold">История</span>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-3 glass hover:border-primary/50 transition-all bg-transparent"
            >
              <CreditCard className="w-8 h-8 text-primary" />
              <span className="font-semibold">Тарифы</span>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center gap-3 glass hover:border-primary/50 transition-all bg-transparent"
            >
              <Settings className="w-8 h-8 text-primary" />
              <span className="font-semibold">Настройки</span>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-6">
              <div className="text-sm text-muted-foreground mb-2">Использовано токенов</div>
              <div className="text-3xl font-bold text-foreground">0</div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="text-sm text-muted-foreground mb-2">Активных чатов</div>
              <div className="text-3xl font-bold text-foreground">0</div>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="text-sm text-muted-foreground mb-2">Текущий тариф</div>
              <div className="text-3xl font-bold text-foreground">Базовый</div>
            </div>
          </div>

          {/* Empty State */}
          <div className="glass rounded-2xl p-12 text-center">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Начните работу с AI</h2>
            <p className="text-muted-foreground mb-6">
              Создайте свой первый чат и начните использовать возможности искусственного интеллекта
            </p>
            <Button className="gradient-blue-purple">Создать первый чат</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
