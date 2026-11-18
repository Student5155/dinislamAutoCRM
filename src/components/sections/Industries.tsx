"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { industries, industriesIntro } from "@/content/industries";

export function Industries() {
  const [active, setActive] = useState(0);
  const it = industries[active];

  return (
    <section id="industries" aria-labelledby="industries-title" className="relative py-24 md:py-36">
      <Container>
        <SectionHeader id="industries-title" eyebrow={industriesIntro.eyebrow} title={industriesIntro.title} lead={industriesIntro.lead} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <Reveal>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {industries.map((ind, i) => {
                const on = i === active;
                return (
                  <li key={ind.id}>
                    <button
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      aria-pressed={on}
                      className={`group relative flex h-full min-h-[118px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 sm:min-h-[140px] sm:p-5 ${on ? "border-lime/60 bg-lime/[0.06]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"}`}
                    >
                      {on && <motion.span layoutId="ind-glow" className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-lime/25 blur-2xl" />}
                      <Icon name={ind.icon} className={`relative h-7 w-7 transition-colors ${on ? "text-lime" : "text-white/60 group-hover:text-white"}`} />
                      <span className="relative mt-4 text-[0.9rem] font-semibold leading-snug sm:text-[0.95rem]">{ind.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="panel glow-border relative min-h-[360px] overflow-hidden p-7 sm:p-9" aria-live="polite">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
              <AnimatePresence mode="wait">
                <motion.div key={it.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="relative">
                  <div className="relative mb-8 grid h-24 w-24 place-items-center">
                    <span className="absolute inset-0 rounded-[28px] border border-lime/40 animate-pulse-soft" />
                    <span className="absolute inset-3 rounded-[20px] bg-lime/10" />
                    <Icon name={it.icon} className="relative h-10 w-10 text-lime" strokeWidth={1.4} />
                  </div>
                  <h3 className="font-display text-2xl font-medium sm:text-3xl">{it.title}</h3>
                  <p className="mt-4 leading-relaxed text-mist">{it.text}</p>
                  <p className="mt-8 text-xs uppercase tracking-[0.16em] text-white/45">С чего обычно начинают</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {it.tools.map((t) => <li key={t} className="rounded-full border border-lime/30 bg-lime/[0.05] px-3.5 py-1.5 text-sm text-lime-soft">{t}</li>)}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
