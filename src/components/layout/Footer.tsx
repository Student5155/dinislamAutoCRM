import { nav, site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pb-28 pt-16 md:pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent" />
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="h-9" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">{site.message}.</p>
          </div>
          <nav aria-label="Навигация в подвале">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">Разделы</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:grid-cols-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-mist transition-colors hover:text-lime">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">Связь</p>
            <ul className="space-y-2.5 text-sm">
              <li><a className="font-semibold hover:text-lime" href={site.contacts.phoneHref}>{site.contacts.phone}</a></li>
              <li><a className="text-mist hover:text-lime" href={site.contacts.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></li>
              <li><a className="text-mist hover:text-lime" href={site.contacts.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>{site.contacts.max ? <a className="text-mist hover:text-lime" href={site.contacts.max} target="_blank" rel="noopener noreferrer">MAX</a> : <span className="text-white/35">MAX — скоро</span>}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {site.tagline}.</p>
          <p>Демонстрационные проекты на сайте отмечены отдельно.</p>
        </div>
      </Container>
      <p aria-hidden="true" className="pointer-events-none mt-12 select-none whitespace-nowrap text-center font-display text-[18vw] font-semibold leading-none tracking-tight text-white/[0.025] md:text-[11vw]">
        AutoCRM
      </p>
    </footer>
  );
}
