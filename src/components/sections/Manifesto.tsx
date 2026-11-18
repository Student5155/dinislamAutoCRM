"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const color = useTransform(progress, [range[0], range[1]], ["#ffffff", children.match(/цифровой|системе/) ? "#A6FF24" : "#ffffff"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

/** Кинетическая типографика: главный посыл бренда проявляется по словам при прокрутке */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = `${site.message}.`.split(" ");

  return (
    <section aria-label="Наш подход" className="relative py-24 md:py-32">
      <Container>
        <p className="eyebrow">Наш подход</p>
        <p ref={ref} className="mt-8 max-w-5xl font-display text-[clamp(1.6rem,1rem+3vw,3.4rem)] font-medium leading-[1.18] tracking-[-0.02em]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
          ))}
        </p>
      </Container>
    </section>
  );
}
