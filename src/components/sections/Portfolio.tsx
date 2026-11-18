"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { categories, portfolioIntro, projects, type Project } from "@/content/portfolio";

function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-ink/80 px-2.5 py-1 text-[0.68rem] font-medium text-mint backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Демонстрационный проект
    </span>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button aria-label="Закрыть" className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`pm-${project.id}`}
        layoutId={`card-${project.id}`}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-graphite sm:rounded-[2rem]"
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className="relative aspect-[16/8]">
          <ProjectArt visual={project.visual} />
          <div className="absolute left-4 top-4">{project.demo && <DemoBadge />}</div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрыть подробности" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-white backdrop-blur hover:text-lime">
            <Icon name="close" />
          </button>
        </div>
        <div className="p-6 sm:p-9">
          <h3 id={`pm-${project.id}`} className="font-display text-2xl font-medium leading-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-3 text-mist">{project.summary}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-lime">Задача</p>
              <p className="mt-3 leading-relaxed text-white/85">{project.task}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-lime">Инструменты</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((t) => <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/75">{t}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-lime">Решение</p>
              <ul className="mt-3 space-y-2.5">
                {project.solution.map((s) => <li key={s} className="flex gap-2.5 text-sm text-white/85"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />{s}</li>)}
              </ul>
            </div>
          </div>
          {project.demo && (
            <p className="mt-8 rounded-2xl border border-white/[0.07] bg-ink/50 p-4 text-sm leading-relaxed text-white/55">
              Это демонстрационный концепт: он показывает возможный подход к задаче и не является проектом для реального клиента.
            </p>
          )}
          <a href="#contact" onClick={onClose} className="btn btn-primary mt-8 w-full sm:w-auto">
            Обсудить похожую задачу <Icon name="arrow" className="btn-arrow h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof categories)[number]["id"]>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const list = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative py-24 md:py-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeader id="portfolio-title" eyebrow={portfolioIntro.eyebrow} title={portfolioIntro.title} lead={portfolioIntro.lead} />
          <div role="group" aria-label="Фильтр проектов" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
                className={`min-h-[44px] shrink-0 rounded-full border px-4 text-sm transition-colors ${filter === c.id ? "border-lime bg-lime font-semibold text-ink" : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={i === 0 && filter === "all" ? "lg:col-span-2" : ""}
              >
                <motion.button
                  layoutId={`card-${p.id}`}
                  onClick={() => setOpen(p)}
                  className="group relative block h-full w-full overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-graphite text-left transition-colors hover:border-lime/40"
                  aria-haspopup="dialog"
                >
                  <div className={`relative overflow-hidden ${i === 0 && filter === "all" ? "aspect-[16/9] lg:aspect-[2.1]" : "aspect-[16/10]"}`}>
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      <ProjectArt visual={p.visual} />
                    </div>
                    <div className="absolute left-4 top-4">{p.demo && <DemoBadge />}</div>
                  </div>
                  <div className="flex items-end justify-between gap-4 p-5 sm:p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-white/40">{categories.find((c) => c.id === p.category)?.label}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{p.title}</h3>
                      <p className="mt-1.5 text-sm text-mist">{p.summary}</p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                      <Icon name="arrowUpRight" className="h-4 w-4" />
                    </span>
                  </div>
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>

      <AnimatePresence>{open && <ProjectModal project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
