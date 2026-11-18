"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, iconPaths } from "@/components/ui/Icon";
import { outcomes, problems, whyIntro } from "@/content/why";

const icons = ["client", "inbox", "gear", "shield", "task", "chart"];

// Положения узлов: хаос (ручное управление) и порядок (цифровая система) — в координатах viewBox 400x400
const chaos = [
  { x: 70, y: 90 }, { x: 300, y: 60 }, { x: 330, y: 250 }, { x: 110, y: 320 }, { x: 210, y: 170 }, { x: 60, y: 210 },
];
const order = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
  return { x: 200 + Math.cos(a) * 140, y: 200 + Math.sin(a) * 140 };
});
const chaosLinks: [number, number][] = [[0, 2], [1, 3], [4, 5], [2, 5], [0, 4], [3, 1]];

export function Why() {
  const [digital, setDigital] = useState(false);
  const [active, setActive] = useState(0);
  const pts = digital ? order : chaos;
  const p = problems[active];
  const spring = { type: "spring" as const, stiffness: 70, damping: 16 };

  return (
    <section id="why" aria-labelledby="why-title" className="relative py-24 md:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeader id="why-title" eyebrow={whyIntro.eyebrow} title={whyIntro.title} lead={whyIntro.lead} />
          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Режим сравнения" className="glass inline-flex rounded-full p-1.5">
              {[
                { v: false, label: "Ручное управление" },
                { v: true, label: "Цифровая система" },
              ].map((o) => (
                <button
                  key={o.label}
                  role="tab"
                  aria-selected={digital === o.v}
                  onClick={() => setDigital(o.v)}
                  className={`relative min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${digital === o.v ? "text-ink" : "text-mist hover:text-white"}`}
                >
                  {digital === o.v && <motion.span layoutId="why-toggle" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">{o.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Список проблем */}
          <Reveal>
            <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {problems.map((item, i) => {
                const on = i === active;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      aria-pressed={on}
                      className="group flex w-full items-center gap-4 py-4 text-left md:py-5"
                    >
                      <span className={`font-display text-xs tabular-nums transition-colors ${on ? "text-lime" : "text-white/30"}`}>0{i + 1}</span>
                      <span className={`flex-1 text-[1.02rem] font-medium transition-colors md:text-lg ${on ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>{item.title}</span>
                      <span className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 ${on ? "border-lime bg-lime text-ink" : "border-white/10 text-white/40"}`}>
                        <Icon name={icons[i]} className="h-4 w-4" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Визуальное сравнение */}
          <Reveal delay={0.1} className="panel glow-border relative order-first overflow-hidden p-5 sm:p-8 lg:order-none">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.16em]">
              <span className={digital ? "text-lime" : "text-[#ff9b7a]"}>{digital ? "Система" : "Хаос"}</span>
              <span className="text-white/40">{digital ? "всё связано" : "всё разрознено"}</span>
            </div>

            <svg viewBox="0 0 400 400" className="relative mx-auto mt-2 w-full max-w-[420px]" role="img" aria-label={digital ? "Процессы связаны через единую систему" : "Процессы разрознены и не связаны"}>
              <defs>
                <radialGradient id="hub" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#A6FF24" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#A6FF24" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Связи */}
              {digital
                ? order.map((o, i) => (
                    <motion.line key={`h${i}`} x1={200} y1={200} x2={o.x} y2={o.y} stroke="#A6FF24" strokeOpacity={i === active ? 0.9 : 0.3} strokeWidth={i === active ? 2 : 1.2}
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.25 + i * 0.06 }} />
                  ))
                : chaosLinks.map(([a, b], i) => (
                    <motion.path key={`c${i}`} d={`M${chaos[a].x} ${chaos[a].y} Q ${(chaos[a].x + chaos[b].x) / 2 + (i % 2 ? 60 : -60)} ${(chaos[a].y + chaos[b].y) / 2 + (i % 2 ? -40 : 50)} ${chaos[b].x} ${chaos[b].y}`}
                      fill="none" stroke="#ff9b7a" strokeOpacity="0.35" strokeDasharray="4 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: i * 0.05 }} />
                  ))}
              {digital && (
                <circle r="150" cx="200" cy="200" fill="none" stroke="#69D9B4" strokeOpacity="0.18" strokeDasharray="2 6" className="animate-dash" />
              )}

              {/* Центр: CRM */}
              <AnimatePresence>
                {digital && (
                  <motion.g key="hub" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} style={{ transformOrigin: "200px 200px" }} transition={spring}>
                    <circle cx="200" cy="200" r="90" fill="url(#hub)" />
                    <circle cx="200" cy="200" r="42" fill="#06121B" stroke="#A6FF24" strokeWidth="2" />
                    <text x="200" y="206" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="700" fontFamily="var(--font-manrope)">CRM</text>
                  </motion.g>
                )}
              </AnimatePresence>
              {!digital && (
                <text x="230" y="215" fill="#ff9b7a" fillOpacity="0.5" fontSize="38" fontFamily="var(--font-unbounded)">?</text>
              )}

              {/* Узлы */}
              {pts.map((pt, i) => (
                <motion.g key={i} initial={false} animate={{ x: pt.x, y: pt.y }} transition={{ ...spring, delay: i * 0.03 }} onClick={() => setActive(i)} className="cursor-pointer">
                  <circle r={i === active ? 30 : 26} fill="#101F2B" stroke={i === active ? "#A6FF24" : digital ? "#69D9B4" : "rgba(255,255,255,0.2)"} strokeWidth={i === active ? 2 : 1.2} />
                  <g transform="translate(-11 -11) scale(0.92)" stroke={i === active ? "#A6FF24" : "#ffffff"} strokeOpacity={i === active ? 1 : 0.75} fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {iconPaths(icons[i])}
                  </g>
                </motion.g>
              ))}
            </svg>

            <AnimatePresence mode="wait">
              <motion.div key={`${active}-${digital}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="relative mt-2 rounded-2xl border border-white/[0.07] bg-ink/60 p-5">
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{digital ? p.digital : p.manual}</p>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* Итог */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08} className="rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#A6FF24]" />
                <h3 className="font-display text-lg">{o.title}</h3>
              </div>
              <p className="mt-3 text-sm text-mist">{o.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="max-w-3xl text-sm leading-relaxed text-white/45">{whyIntro.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
