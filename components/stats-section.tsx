import { Card } from "@/components/ui/card"
import { Users, MessageSquare, Activity, Cpu } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Пользователей",
  },
  {
    icon: MessageSquare,
    value: "1M+",
    label: "Запросов обработано",
  },
  {
    icon: Activity,
    value: "99.9%",
    label: "Uptime",
  },
  {
    icon: Cpu,
    value: "5+",
    label: "AI-моделей",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="glass p-8 text-center hover:border-primary transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full gradient-blue-purple flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
