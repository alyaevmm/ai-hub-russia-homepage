import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const models = [
  {
    name: "GigaChat",
    provider: "Сбер",
    description: "Российский AI для общих задач",
    status: "online",
    logo: "/gigachat-sber-logo-green-ai.jpg",
  },
  {
    name: "YandexGPT",
    provider: "Яндекс",
    description: "Альтернативный российский AI",
    status: "online",
    logo: "/yandex-gpt-logo-red-yellow.jpg",
  },
  {
    name: "GPT-4",
    provider: "OpenAI",
    description: "Премиум международный AI",
    status: "online",
    logo: "/openai-chatgpt-logo-black-green.jpg",
  },
  {
    name: "Claude",
    provider: "Anthropic",
    description: "AI для анализа и рассуждений",
    status: "online",
    logo: "/claude-anthropic-logo-orange-brown.jpg",
  },
  {
    name: "Gemini",
    provider: "Google",
    description: "Мультимодальный AI от Google",
    status: "online",
    logo: "/google-gemini-logo-colorful-sparkle.jpg",
  },
]

export function AIModelsSection() {
  return (
    <section className="py-20 px-4" id="models">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Выберите AI-модель для вашей задачи</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Лучшие российские и международные модели в одном месте
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <Card
              key={model.name}
              className="glass p-6 hover:border-primary transition-all duration-300 hover:scale-105 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-background/50 flex items-center justify-center">
                    <Image
                      src={model.logo || "/placeholder.svg"}
                      alt={`${model.name} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <Badge
                    variant={model.status === "online" ? "default" : "secondary"}
                    className="bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                    Онлайн
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{model.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{model.provider}</p>
                  <p className="text-sm text-foreground">{model.description}</p>
                </div>

                <Button className="w-full group-hover:gradient-blue-purple transition-all">Попробовать</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
