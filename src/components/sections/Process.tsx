"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processIntro, processSteps } from "@/content/process";

/** «Как мы работаем»: линия прогресса и этапы появляются последовательно при прокрутке (GSAP ScrollTrigger) */
export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.fromTo(
            "[data-line]",
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
          );
          gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0.15, x: 24 },
              { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none reverse" } },
            );
            const dot = el.querySelector("[data-dot]");
            if (dot)
              gsap.fromTo(dot, { scale: 0.4, backgroundColor: "#101F2B" }, { scale: 1, backgroundColor: "#A6FF24", duration: 0.6, scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none reverse" } });
          });
        });
      }, root);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section id="process" aria-labelledby="process-title" className="relative py-24 md:py-36">
      <Container>
        <div ref={root} className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader id="process-title" eyebrow={processIntro.eyebrow} title={processIntro.title} lead={processIntro.lead} />
            {/* Лаконичная графика: шесть «пикселей» — как в фирменном знаке */}
            <div aria-hidden="true" className="mt-12 hidden grid-cols-6 gap-2 lg:grid">
              {processSteps.map((_, i) => (
                <span key={i} className="aspect-square rounded-md bg-gradient-to-br from-lime/70 to-[#5aa832]/40" style={{ opacity: 0.25 + i * 0.13 }} />
              ))}
            </div>
          </div>

          <ol data-steps className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10" />
            <span data-line aria-hidden="true" className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-lime via-lime to-mint shadow-[0_0_12px_#A6FF24]" />
            {processSteps.map((s, i) => (
              <li key={s.title} data-step className="relative pb-12 pl-16 last:pb-0">
                <span data-dot aria-hidden="true" className="absolute left-[12px] top-1.5 h-[15px] w-[15px] rounded-full bg-lime ring-4 ring-ink" />
                <p className="font-display text-sm text-lime">Этап {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl font-medium sm:text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
