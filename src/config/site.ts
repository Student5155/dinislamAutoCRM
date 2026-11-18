/**
 * Основные настройки сайта. Всё, что владельцу может понадобиться поменять, — здесь.
 */
const phoneDigits = "79050055155";

export const site = {
  name: "DinislamAutoCRM",
  tagline: "Цифровые решения для бизнеса",
  description:
    "Создаём сайты, внедряем CRM-системы и автоматизируем бизнес-процессы. Чат-боты и AI-решения для компаний, которые хотят работать системно.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  locale: "ru_RU",
  message: "Мы помогаем бизнесу переходить от ручных процессов к современной цифровой системе управления",
  contacts: {
    phone: "+7 905 005-51-55",
    phoneHref: `tel:+${phoneDigits}`,
    whatsapp: `https://wa.me/${phoneDigits}`,
    telegram: `https://t.me/+${phoneDigits}`,
    /** Официальная ссылка на профиль MAX. Подставьте через NEXT_PUBLIC_MAX_URL или прямо здесь. */
    max: process.env.NEXT_PUBLIC_MAX_URL || "",
  },
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
} as const;

export const nav = [
  { href: "#why", label: "Зачем цифровизация" },
  { href: "#services", label: "Направления" },
  { href: "#flow", label: "Как это работает" },
  { href: "#process", label: "Этапы" },
  { href: "#portfolio", label: "Проекты" },
  { href: "#industries", label: "Отрасли" },
  { href: "#contact", label: "Контакты" },
] as const;

export const withBase = (path: string) => `${site.basePath}${path}`;
