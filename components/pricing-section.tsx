import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Бесплатный",
    price: "0₽",
    period: "навсегда",
    features: ["10 запросов в день", "Базовые AI-модели", "История 7 дней", "Поддержка сообщества"],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Базовый",
    price: "990₽",
    period: "в месяц",
    features: ["100 запросов в месяц", "Все AI-модели", "История 30 дней", "Приоритетная поддержка", "Экспорт данных"],
    cta: "Выбрать тариф",
    popular: true,
  },
  {
    name: "Профессиональный",
    price: "2990₽",
    period: "в месяц",
    features: [
      "500 запросов в месяц",
      "API доступ",
      "Расширенная аналитика",
      "Персональный менеджер",
      "Приоритетная обработка",
      "Кастомные интеграции",
    ],
    cta: "Выбрать тариф",
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 px-4" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Выберите подходящий тариф</h2>
          <p className="text-xl text-muted-foreground text-pretty">Гибкие цены для любых задач и бюджетов</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`glass p-8 relative ${
                plan.popular ? "border-primary shadow-lg shadow-primary/20 scale-105" : "hover:border-primary/50"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-blue-purple px-4 py-1 rounded-full text-sm font-semibold text-white">
                    {plan.name === "Профессиональный" ? "Рекомендуем" : "Популярный"}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "gradient-blue-purple" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
