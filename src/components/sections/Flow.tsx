"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { flowIntro, flowSteps } from "@/content/flow";

const W = 1200;
const H = 520;
const pos = [
  { x: 150, y: 120 }, { x: 450, y: 120 }, { x: 750, y: 120 }, { x: 1050, y: 120 },
  { x: 900, y: 400 }, { x: 600, y: 400 }, { x: 300, y: 400 },
];
const seg = (i: number) => {
  const a = pos[i];
  const b = pos[i + 1];
  if (i === 3) return `M${a.x} ${a.y} C ${a.x + 150} ${a.y + 40}, ${b.x + 170} ${b.y - 40}, ${b.x} ${b.y}`;
  return `M${a.x} ${a.y} L ${b.x} ${b.y}`;
};

export function Flow() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const reduce = useReducedMotion();

  // Автопроигрывание: только когда схема на экране и пользователь не взаимодействует
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % flowSteps.length), 3200);
    return () => window.clearInterval(t);
  }, [auto, inView, reduce]);

  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };
  const step = flowSteps[active];

  return (
    <section id="flow" aria-labelledby="flow-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.05] blur-[140px]" />
      </div>
      <Container>
        <SectionHeader id="flow-title" eyebrow={flowIntro.eyebrow} title={flowIntro.title} lead={flowIntro.lead} />

        <div ref={ref} className="mt-14 md:mt-20" onMouseEnter={() => setAuto(false)}>
          {/* Десктоп: змейка */}
          <Reveal className="panel glow-border relative hidden overflow-hidden p-8 lg:block">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative" style={{ aspectRatio: `${W}/${H}` }}>
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <radialGradient id="fpulse"><stop offset="0" stopColor="#fff" /><stop offset=".35" stopColor="#A6FF24" /><stop offset="1" stopColor="#A6FF24" stopOpacity="0" /></radialGradient>
                </defs>
                {pos.slice(0, -1).map((_, i) => {
                  const d = seg(i);
                  const done = i < active;
                  return (
                    <g key={i}>
                      <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                      <motion.path d={d} fill="none" stroke="#A6FF24" strokeWidth="2" initial={false} animate={{ pathLength: done ? 1 : 0, opacity: done ? 0.85 : 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                      <path d={d} fill="none" stroke="#69D9B4" strokeOpacity="0.35" strokeWidth="1.5" className="animate-dash" />
                      {!reduce && (
                        <circle r="9" fill="url(#fpulse)">
                          <animateMotion dur="2.4s" begin={`${i * 0.34}s`} repeatCount="indefinite" path={d} />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>
              {flowSteps.map((s, i) => {
                const on = i === active;
                const passed = i < active;
                return (
                  <button
                    key={s.id}
                    onClick={() => pick(i)}
                    onMouseEnter={() => pick(i)}
                    aria-pressed={on}
                    aria-label={`${i + 1}. ${s.title}`}
                    className="group absolute flex w-44 -translate-x-1/2 -translate-y-[38px] flex-col items-center text-center"
                    style={{ left: `${(pos[i].x / W) * 100}%`, top: `${(pos[i].y / H) * 100}%` }}
                  >
                    <span className={`relative grid h-[76px] w-[76px] place-items-center rounded-[22px] border transition-all duration-500 ${on ? "scale-110 border-lime bg-lime text-ink shadow-[0_0_50px_-6px_rgba(166,255,36,0.7)]" : passed ? "border-lime/50 bg-graphite text-lime" : "border-white/12 bg-graphite text-white/80 group-hover:border-lime/50"}`}>
                      <Icon name={s.icon} className="h-7 w-7" />
                      <span className={`absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full font-display text-[0.65rem] ${on ? "bg-ink text-lime" : "bg-ink-2 text-white/60 ring-1 ring-white/10"}`}>{i + 1}</span>
                    </span>
                    <span className={`mt-4 text-sm font-semibold leading-snug transition-colors ${on ? "text-white" : "text-white/60"}`}>{s.title}</span>
                  </button>
                );
              })}
            </div>
            {/* Описание активного шага */}
            <div className="relative mt-4 min-h-[84px] border-t border-white/[0.07] pt-6">
              <AnimatePresence mode="wait">
                <motion.div key={step.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="grid grid-cols-[auto_1fr] items-baseline gap-x-8">
                  <p className="font-display text-sm text-lime">Шаг {active + 1} / {flowSteps.length}</p>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-mist">{step.text}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Мобильные и планшеты: вертикальная лента */}
          <ol className="relative lg:hidden">
            <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" />
            <motion.span aria-hidden="true" className="absolute left-[27px] top-6 w-px origin-top bg-lime shadow-[0_0_10px_#A6FF24]" initial={false} animate={{ height: `${(active / (flowSteps.length - 1)) * 92}%` }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
            {flowSteps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="relative pb-3">
                  <button onClick={() => pick(i)} aria-expanded={on} className="flex w-full items-start gap-4 text-left">
                    <span className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border transition-all duration-500 ${on ? "border-lime bg-lime text-ink shadow-[0_0_30px_-4px_rgba(166,255,36,0.6)]" : i < active ? "border-lime/50 bg-graphite text-lime" : "border-white/12 bg-graphite text-white/75"}`}>
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <span className={`flex-1 rounded-2xl border p-4 transition-colors duration-500 ${on ? "border-lime/30 bg-lime/[0.04]" : "border-transparent"}`}>
                      <span className="font-display text-[0.65rem] text-lime">0{i + 1}</span>
                      <span className="mt-1 block font-semibold">{s.title}</span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span className="block overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}>
                            <span className="block pt-2 text-sm leading-relaxed text-mist">{s.text}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/45">Так выглядит базовый сценарий. В реальном проекте шаги и инструменты настраиваются под процессы конкретной компании.</p>
            <button onClick={() => setAuto((v) => !v)} className="btn btn-ghost !min-h-[44px] !text-sm" aria-pressed={auto}>
              {auto ? "Пауза" : "Воспроизвести схему"}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
