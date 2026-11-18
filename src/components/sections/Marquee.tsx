import { LogoMark } from "@/components/ui/Logo";

const items = ["Корпоративные сайты", "Лендинги", "Интернет-магазины", "CRM-системы", "Автоматизация процессов", "Интеграции", "Чат-боты", "AI-ассистенты"];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-white/[0.06] bg-graphite/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-sm uppercase tracking-[0.12em] text-white/55 sm:text-base">
            {t}
            <LogoMark className="h-4 opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
}
