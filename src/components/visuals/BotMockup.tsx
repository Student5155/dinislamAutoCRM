"use client";

import { motion } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";

const messages = [
  { from: "user", text: "Здравствуйте! Сколько стоит сайт для небольшой компании?" },
  { from: "bot", text: "Здравствуйте! Стоимость зависит от задач. Подскажите, нужен лендинг, сайт с каталогом или интернет-магазин?" },
  { from: "user", text: "Сайт с каталогом услуг и формой заявки" },
  { from: "bot", text: "Понял. Передаю ваш запрос специалисту — он уточнит детали и подготовит расчёт. Как с вами удобнее связаться?" },
  { from: "system", text: "Обращение передано менеджеру · создана задача в CRM" },
];

/** Пример диалога чат-бота с передачей обращения человеку */
export function BotMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]" role="img" aria-label="Пример диалога: бот отвечает на типовой вопрос и передаёт обращение менеджеру">
      <div className="absolute -inset-10 rounded-full bg-lime/10 blur-3xl" />
      <div className="relative rounded-[2.2rem] border border-white/15 bg-[#0b1924] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#071520]">
          <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-lime/10"><LogoMark className="h-4" /></span>
            <span className="text-xs leading-tight"><b className="block">Ассистент</b><span className="text-lime">онлайн · бот</span></span>
          </div>
          <motion.ul
            className="space-y-2.5 px-3.5 py-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px" }}
            variants={{ show: { transition: { staggerChildren: 0.55 } } }}
          >
            {messages.map((m, i) => (
              <motion.li
                key={i}
                variants={{ hidden: { opacity: 0, y: 12, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={m.from === "user" ? "flex justify-end" : m.from === "system" ? "flex justify-center" : "flex"}
              >
                <span
                  className={
                    m.from === "user"
                      ? "max-w-[82%] rounded-2xl rounded-br-md bg-lime px-3 py-2 text-[0.74rem] leading-snug text-ink"
                      : m.from === "system"
                        ? "rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5 text-center text-[0.65rem] text-mint"
                        : "max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3 py-2 text-[0.74rem] leading-snug"
                  }
                >
                  {m.text}
                </span>
              </motion.li>
            ))}
          </motion.ul>
          <div className="flex items-center gap-2 border-t border-white/[0.06] px-3.5 py-3">
            <span className="flex-1 rounded-full bg-white/[0.05] px-3 py-2 text-[0.68rem] text-white/35">Сообщение…</span>
            <span className="flex gap-1 pr-1" aria-hidden="true">
              {[0, 1, 2].map((d) => <i key={d} className="h-1.5 w-1.5 rounded-full bg-lime" style={{ animation: `typing 1.2s ${d * 0.15}s infinite` }} />)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
