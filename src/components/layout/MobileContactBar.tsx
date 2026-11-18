"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Icon, TelegramIcon, WhatsAppIcon } from "@/components/ui/Icon";

/** Нижняя панель связи на мобильных — появляется после первого экрана, без мигания и навязчивости */
export function MobileContactBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[0.7rem] font-medium text-white/85 active:bg-white/5";

  return (
    <div
      className={`fixed inset-x-3 z-40 transition-all duration-500 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <nav aria-label="Быстрая связь" className="glass flex items-stretch gap-1 rounded-2xl p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">
        <a href={site.contacts.phoneHref} className={item}><Icon name="phone" className="h-5 w-5 text-lime" />Звонок</a>
        <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer" className={item}><TelegramIcon className="h-5 w-5 text-lime" />Telegram</a>
        <a href={site.contacts.whatsapp} target="_blank" rel="noopener noreferrer" className={item}><WhatsAppIcon className="h-5 w-5 text-lime" />WhatsApp</a>
        <a href="#contact" className="flex flex-[1.3] items-center justify-center rounded-xl bg-lime px-2 text-[0.8rem] font-semibold text-ink">Заявка</a>
      </nav>
    </div>
  );
}
