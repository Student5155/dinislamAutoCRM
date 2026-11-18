import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { HeroScene } from "@/components/visuals/HeroScene";

const headline = ["Ваш", "бизнес", "заслуживает", "большего,", "чем", "ручное", "управление"];
const highlight = new Set(["большего,"]);

const chips = [
  { icon: "form", title: "Новая заявка", meta: "с сайта · только что", pos: "left-[0%] top-[16%]", delay: "0s" },
  { icon: "client", title: "Клиент в CRM", meta: "карточка создана", pos: "right-[0%] top-[30%]", delay: "-2s" },
  { icon: "bell", title: "Уведомление", meta: "менеджеру в Telegram", pos: "left-[6%] bottom-[16%]", delay: "-4s" },
  { icon: "task", title: "Задача", meta: "связаться сегодня", pos: "right-[6%] bottom-[8%]", delay: "-1s" },
] as const;

const directions = [
  { icon: "globe", label: "Сайты" },
  { icon: "crm", label: "CRM-системы" },
  { icon: "gear", label: "Автоматизация" },
  { icon: "bot", label: "Боты и AI" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-[calc(var(--header-h)+2rem)] md:pb-24 lg:min-h-[100svh] lg:pt-[calc(var(--header-h)+3rem)]">
      {/* Фон: сетка, свечения и фирменные диагональные световые линии */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-mint/[0.07] blur-[120px]" />
        <div className="absolute -right-20 top-10 h-[600px] w-[600px] rounded-full bg-lime/[0.08] blur-[140px]" />
        <span className="streak left-[-10%] top-[14%] w-[45%] opacity-70 [--r:-24deg] [animation:streak-run_9s_ease-in-out_infinite]" style={{ transform: "rotate(-24deg)" }} />
        <span className="streak bottom-[10%] right-[-8%] w-[50%] opacity-60 [--r:-24deg] [animation:streak-run_11s_ease-in-out_-4s_infinite]" style={{ transform: "rotate(-24deg)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <Container className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        <div className="relative z-10">
          <p className="eyebrow [animation:fade-up_.9s_var(--ease-out-expo)_both]">Цифровые решения для бизнеса</p>

          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.15rem,0.9rem+3.9vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.03em]">
            {headline.map((w, i) => (
              <span key={i} className="mr-[0.26em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                <span
                  className={`hero-word inline-block ${highlight.has(w) ? "text-gradient" : ""}`}
                  style={{ animationDelay: `${0.15 + i * 0.07}s` }}
                >
                  {w}
                </span>
                {i < headline.length - 1 && " "}
              </span>
            ))}
          </h1>

          <p className="lead mt-7 max-w-xl [animation:fade-up_1s_var(--ease-out-expo)_.75s_both]">
            Создаём сайты, внедряем CRM-системы и автоматизируем бизнес-процессы, помогая компаниям работать эффективнее и открывать новые возможности для роста.
          </p>

          <div className="mt-9 flex flex-col gap-3 xs:flex-row [animation:fade-up_1s_var(--ease-out-expo)_.9s_both]">
            <a href="#services" className="btn btn-primary">
              Посмотреть возможности <Icon name="arrow" className="btn-arrow h-4 w-4" />
            </a>
            <a href="#contact" className="btn btn-ghost">Обсудить мой проект</a>
          </div>

          <ul className="mt-12 grid max-w-xl grid-cols-2 gap-y-4 border-t border-white/[0.07] pt-6 sm:grid-cols-4 [animation:fade-up_1s_var(--ease-out-expo)_1.05s_both]">
            {directions.map((d, i) => (
              <li key={d.label} className={`flex items-center gap-2.5 text-sm text-white/80 sm:flex-col sm:items-start sm:gap-2 ${i ? "sm:border-l sm:border-white/[0.07] sm:pl-4" : ""}`}>
                <Icon name={d.icon} className="h-5 w-5 text-lime" />
                {d.label}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D-композиция */}
        <div className="relative mx-auto aspect-square w-full max-w-[620px] [animation:fade-in_1.6s_ease_.2s_both] lg:max-w-none">
          <HeroScene className="absolute inset-[-6%]" />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <LogoMark glow className="w-[30%] drop-shadow-[0_0_30px_rgba(166,255,36,0.35)]" />
          </div>
          {chips.map((c) => (
            <div key={c.title} className={`absolute ${c.pos} hidden xs:block`}>
              <div className="glass animate-float flex items-center gap-3 rounded-2xl px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] sm:px-4 sm:py-3" style={{ animationDelay: c.delay }}>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime/12 text-lime sm:h-9 sm:w-9">
                  <Icon name={c.icon} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
                <span>
                  <span className="block text-[0.78rem] font-semibold sm:text-sm">{c.title}</span>
                  <span className="block text-[0.68rem] text-mist sm:text-xs">{c.meta}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <a href="#why" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-mist lg:flex" aria-label="Прокрутить к следующему разделу">
        <span className="h-10 w-6 rounded-full border border-white/20 p-1">
          <span className="mx-auto block h-2 w-1 rounded-full bg-lime [animation:scroll-dot_2.2s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}
