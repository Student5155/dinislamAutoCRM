# DinislamAutoCRM — сайт

Рекламный сайт бренда **DinislamAutoCRM**: создание сайтов, внедрение CRM-систем, автоматизация бизнес-процессов, чат-боты и AI-решения.

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · GSAP · Framer Motion · three.js.
Сборка полностью статическая (`out/`) — подходит для GitHub Pages, Netlify, Vercel, любого хостинга со статикой или обычного веб-сервера (nginx/Apache).

## Быстрый старт

Нужен Node.js 20.9+.

```bash
npm install
npm run dev        # разработка: http://localhost:3000
npm run build      # production-сборка в папку out/
npm start          # локальный просмотр собранной папки out/
npm run typecheck  # проверка типов
```

## Настройки (`.env`)

Скопируйте `.env.example` в `.env.local` и заполните:

| Переменная | Зачем |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта — для `sitemap.xml`, `robots.txt`, Open Graph. **Обязательно задайте перед публикацией.** |
| `NEXT_PUBLIC_BASE_PATH` | Подпапка, если сайт открывается как `https://user.github.io/repo` → `/repo`. Для своего домена — пусто. |
| `NEXT_PUBLIC_MAX_URL` | Официальная ссылка на профиль MAX. Пока пусто — кнопка MAX видна, но неактивна с подписью «скоро». |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Необязательно. URL, принимающий POST JSON `{name, contact, interest, task}` (например, Formspree или свой обработчик). Если пусто — форма собирает сообщение и предлагает отправить его в WhatsApp или Telegram. |

Телефон, WhatsApp и Telegram задаются в `src/config/site.ts`.

## Где редактировать контент

Весь текст вынесен из вёрстки в `src/content/`:

| Файл | Раздел |
|---|---|
| `why.ts` | «Почему бизнесу необходима цифровизация» |
| `services.ts` | Четыре направления + возможности и ограничения AI |
| `flow.ts` | Интерактивная схема «Как работает цифровой бизнес» |
| `process.ts` | «Как мы работаем» |
| `portfolio.ts` | Портфолио. Сейчас только демо-концепты (`demo: true` → плашка «Демонстрационный проект»). Реальные кейсы добавляйте с `demo: false`. |
| `industries.ts` | «Кому подходят наши решения» |
| `contact.ts` | Тексты контактов и варианты «Направление интереса» |

Навигация, телефон, мессенджеры и главный посыл — `src/config/site.ts`.

## Структура

```
src/
  app/            layout (метаданные, шрифты, JSON-LD), page, sitemap.ts, robots.ts, иконки
  config/site.ts  контакты и общие настройки
  content/        тексты разделов
  components/
    layout/       Header, Footer, MobileContactBar, Providers
    sections/     Hero, Why, Services, Manifesto, Flow, Process, Portfolio, Industries, Contact, Marquee
    visuals/      HeroScene (three.js), мокапы устройств, CRM, блок-схема, чат-бот, обложки проектов
    ui/           Logo (вектор фирменного знака), Icon, Reveal, ContactButtons, …
public/brand/og.jpg  изображение для соцсетей (из оригинального логотипа)
```

## Бренд

- Цвета: `#06121B` (тёмно-синий), `#101F2B` (графит), `#A6FF24` (неоновый лайм), `#69D9B4` (мята), `#FFFFFF`. Заданы токенами в `src/app/globals.css` (`@theme`).
- Логотип: `src/components/ui/Logo.tsx` — векторное повторение существующего знака (буква D, стрелка, «пиксели»), без изменения формы. Иконка вкладки — `src/app/icon.svg`.
- Фотографий людей на сайте нет: только CSS/SVG-графика, абстрактная 3D-сцена и макеты интерфейсов.

## Анимации и производительность

- three.js загружается лениво после первой отрисовки, на мобильных — меньше частиц и ниже плотность пикселей; рендер останавливается, когда сцена вне экрана.
- `prefers-reduced-motion`: CSS-анимации отключаются, Framer Motion работает в режиме `reducedMotion="user"`, GSAP-анимации не запускаются, 3D-сцена рисуется одним статичным кадром.
- Никаких всплывающих окон, таймеров и мигающих кнопок.

## Публикация на GitHub Pages

1. Создайте репозиторий и запушьте проект в ветку `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` соберёт и опубликует сайт. По умолчанию `BASE_PATH = /имя-репозитория`.
4. Для своего домена: в Settings → Secrets and variables → Actions → Variables задайте `BASE_PATH` пустым и `SITE_URL=https://ваш-домен`. Там же можно задать `MAX_URL` и `FORM_ENDPOINT`.

Файл `public/.nojekyll` нужен, чтобы GitHub Pages отдавал папку `_next`.

## Другие хостинги

Загрузите содержимое `out/` на любой статический хостинг. Серверные функции Next.js не используются.
