import { Mail, Phone, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-blue-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold text-foreground">AI Hub Russia</span>
            </div>
            <p className="text-sm text-muted-foreground">Платформа доступа к российским и международным AI-сервисам</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Компания</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Тарифы
                </a>
              </li>
              <li>
                <a href="#support" className="text-muted-foreground hover:text-primary transition-colors">
                  Поддержка
                </a>
              </li>
              <li>
                <a href="#docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Документы
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ресурсы</h4>
            <ul className="space-y-2">
              <li>
                <a href="#api" className="text-muted-foreground hover:text-primary transition-colors">
                  API документация
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#status" className="text-muted-foreground hover:text-primary transition-colors">
                  Статус сервиса
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@aihub.ru" className="hover:text-primary transition-colors">
                  info@aihub.ru
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:+78001234567" className="hover:text-primary transition-colors">
                  +7 (800) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Send className="w-4 h-4" />
                <a href="https://t.me/aihubrussia" className="hover:text-primary transition-colors">
                  @aihubrussia
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 AI Hub Russia. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
