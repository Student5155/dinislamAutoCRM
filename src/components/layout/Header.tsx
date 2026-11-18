"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ContactButtons } from "@/components/ui/ContactButtons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка активного раздела в навигации
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? "border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#top" className="h-8 shrink-0 sm:h-9" aria-label={`${site.name} — на главную`} onClick={() => setOpen(false)}>
          <Logo className="h-full" />
        </a>

        <nav aria-label="Основная навигация" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[0.86rem] transition-colors ${isActive ? "text-white" : "text-mist hover:text-white"}`}
                  >
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.contacts.phoneHref} className="hidden whitespace-nowrap text-sm font-semibold text-white/90 hover:text-lime md:inline xl:hidden 2xl:inline">
            {site.contacts.phone}
          </a>
          <a href="#contact" className="btn btn-primary hidden !min-h-[44px] !px-5 !text-sm sm:inline-flex md:ml-3">
            Обсудить проект
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </Container>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-y-auto bg-ink xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
            <Container className="relative flex min-h-full flex-col py-8">
              <nav aria-label="Мобильная навигация">
                <ul className="space-y-1">
                  {nav.map((item, i) => (
                    <motion.li key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                      <a href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-xl">
                        {item.label}
                        <Icon name="arrowUpRight" className="h-5 w-5 text-lime" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto pt-10">
                <p className="mb-4 text-sm text-mist">Связаться напрямую</p>
                <ContactButtons layout="grid" onClick={() => setOpen(false)} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
