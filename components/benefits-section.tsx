import { Card } from "@/components/ui/card"
import { ShieldCheck, Rocket, Wallet, MapPin } from "lucide-react"

const benefits = [
  {
    icon: MapPin,
    title: "Российская юрисдикция",
    description: "Полное соответствие законодательству РФ и защита ваших данных",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность данных",
    description: "Шифрование данных и соблюдение стандартов информационной безопасности",
  },
  {
    icon: Rocket,
    title: "Быстрая обработка",
    description: "Оптимизированная инфраструктура для мгновенных ответов",
  },
  {
    icon: Wallet,
    title: "Гибкие тарифы",
    description: "Платите только за то, что используете. Без скрытых комиссий",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 px-4" id="benefits">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Почему выбирают AI Hub Russia</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Надежная платформа для работы с искусственным интеллектом
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Card key={benefit.title} className="glass p-6 hover:border-primary transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg glass-icon flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
