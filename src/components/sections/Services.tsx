import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { aiCapabilities, services, servicesIntro, type Service } from "@/content/services";
import { DevicesMockup } from "@/components/visuals/DevicesMockup";
import { CrmMockup } from "@/components/visuals/CrmMockup";
import { AutomationFlow } from "@/components/visuals/AutomationFlow";
import { BotMockup } from "@/components/visuals/BotMockup";

const visuals: Record<Service["id"], React.ReactNode> = {
  sites: <DevicesMockup />,
  crm: <CrmMockup />,
  automation: <AutomationFlow />,
  ai: <BotMockup />,
};
const serviceIcon: Record<Service["id"], string> = { sites: "globe", crm: "crm", automation: "gear", ai: "bot" };

function AiLimits() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-lime/20 bg-lime/[0.04] p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-lime">Берёт на себя бот</p>
        <ul className="mt-3 space-y-2 text-sm text-white/85">
          {aiCapabilities.can.map((c) => <li key={c} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />{c}</li>)}
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-white/60">Остаётся за человеком</p>
        <ul className="mt-3 space-y-2 text-sm text-white/85">
          {aiCapabilities.human.map((c) => <li key={c} className="flex gap-2"><Icon name="user" className="mt-0.5 h-4 w-4 shrink-0 text-mint" />{c}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Container>
        <SectionHeader id="services-title" eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} lead={servicesIntro.lead} />

        {/* Быстрая навигация по направлениям */}
        <Reveal className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {services.map((s) => (
            <a key={s.id} href={`#service-${s.id}`} className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/80 transition-colors hover:border-lime/50 hover:text-white">
              <span className="font-display text-[0.7rem] text-lime">{s.index}</span>
              {s.title.replace(/-$/, "")} {s.accent}
            </a>
          ))}
        </Reveal>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={s.id} id={`service-${s.id}`} aria-labelledby={`svc-${s.id}`} className="relative grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <span aria-hidden="true" className={`pointer-events-none absolute -top-10 select-none font-display text-[7rem] font-semibold leading-none text-white/[0.03] md:text-[11rem] ${flip ? "right-0" : "left-0"}`}>
                  {s.index}
                </span>
                <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime/10 text-lime"><Icon name={serviceIcon[s.id]} className="h-5 w-5" /></span>
                      <span className="font-display text-sm text-white/40">{s.index} / 04</span>
                    </div>
                    <h3 id={`svc-${s.id}`} className="mt-6 font-display text-[clamp(1.8rem,1.2rem+2.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]">
                      {s.title}{s.title.endsWith("-") ? "" : " "}<span className="text-lime">{s.accent}</span>
                    </h3>
                    <p className="lead mt-5 max-w-xl">{s.lead}</p>
                  </Reveal>
                  <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {s.items.map((it, k) => (
                      <li key={it.title} className="border-t border-white/[0.07] py-4">
                        <Reveal delay={k * 0.05}>
                          <p className="flex items-center gap-2 text-[0.98rem] font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-lime" />{it.title}</p>
                          <p className="mt-1.5 pl-3.5 text-sm leading-relaxed text-mist">{it.text}</p>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                  {s.id === "ai" && (
                    <Reveal>
                      <AiLimits />
                      {s.note && <p className="mt-5 text-sm leading-relaxed text-white/50">{s.note}</p>}
                    </Reveal>
                  )}
                </div>
                <Reveal delay={0.1} y={40} className={`relative ${flip ? "lg:order-1" : ""}`}>
                  {visuals[s.id]}
                </Reveal>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
