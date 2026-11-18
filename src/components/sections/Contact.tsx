"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { Icon, TelegramIcon, WhatsAppIcon } from "@/components/ui/Icon";
import { contactIntro, interestOptions } from "@/content/contact";

type Status = "idle" | "sending" | "sent" | "choose";

const field =
  "w-full rounded-2xl border border-white/10 bg-ink/60 px-4 py-3.5 text-[1rem] text-white placeholder:text-white/30 outline-none transition-colors focus:border-lime/70 focus:bg-ink";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") || "").trim(),
      contact: String(fd.get("contact") || "").trim(),
      interest: String(fd.get("interest") || ""),
      task: String(fd.get("task") || "").trim(),
    };
    const text = [
      `Здравствуйте! Меня зовут ${data.name}.`,
      data.interest && `Интересует: ${data.interest}.`,
      data.task && `Задача: ${data.task}`,
      `Как связаться: ${data.contact}`,
    ]
      .filter(Boolean)
      .join("\n");
    setMessage(text);

    // Если задан обработчик формы — отправляем туда. Иначе предлагаем отправить через мессенджер.
    if (site.formEndpoint) {
      try {
        setStatus("sending");
        const r = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(String(r.status));
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("choose");
      }
    } else {
      setStatus("choose");
    }
  };

  const copyAndOpenTelegram = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      /* буфер обмена может быть недоступен — просто открываем Telegram */
    }
    window.open(site.contacts.telegram, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 translate-y-1/3 rounded-full bg-lime/[0.07] blur-[140px]" />
        <span className="streak bottom-[18%] left-[-10%] w-[40%] opacity-50" style={{ transform: "rotate(-20deg)" }} />
      </div>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal className="min-w-0">
            <p className="eyebrow">{contactIntro.eyebrow}</p>
            <h2 id="contact-title" className="h-section mt-5">{contactIntro.title}</h2>
            <p className="lead mt-6 max-w-xl">{contactIntro.lead}</p>

            <a href={site.contacts.phoneHref} className="group mt-10 inline-flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-ink transition-transform duration-500 group-hover:-rotate-6"><Icon name="phone" className="h-6 w-6" /></span>
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-white/45">Основной номер</span>
                <span className="block font-display text-[clamp(1.4rem,1rem+1.6vw,2.1rem)] font-medium tracking-tight transition-colors group-hover:text-lime">{site.contacts.phone}</span>
              </span>
            </a>

            <div className="mt-10 max-w-xl">
              <ContactButtons layout="cards" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div className="panel glow-border relative p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {status === "choose" || status === "sent" ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lime/10 text-lime"><Icon name="check" className="h-7 w-7" /></span>
                    {status === "sent" ? (
                      <>
                        <h3 className="mt-6 font-display text-2xl">Спасибо, заявка отправлена</h3>
                        <p className="mt-3 text-mist">Мы свяжемся с вами удобным способом. Обычно — в течение рабочего дня.</p>
                      </>
                    ) : (
                      <>
                        <h3 className="mt-6 font-display text-2xl">Сообщение готово</h3>
                        <p className="mt-3 text-mist">Выберите, куда его отправить — откроется приложение или веб-версия мессенджера.</p>
                        <pre className="mt-5 max-h-40 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/[0.07] bg-ink/60 p-4 font-sans text-sm text-white/80">{message}</pre>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <a href={`${site.contacts.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <WhatsAppIcon className="h-5 w-5" /> Отправить в WhatsApp
                          </a>
                          <button type="button" onClick={copyAndOpenTelegram} className="btn btn-ghost">
                            <TelegramIcon className="h-5 w-5" /> {copied ? "Скопировано — вставьте в чат" : "Скопировать и открыть Telegram"}
                          </button>
                        </div>
                      </>
                    )}
                    <button type="button" onClick={() => { setStatus("idle"); setCopied(false); }} className="mt-6 text-sm text-mist underline-offset-4 hover:text-white hover:underline">
                      Вернуться к форме
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5" aria-label="Форма обратной связи">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl">Короткая заявка</h3>
                      <p className="mt-2 text-sm text-mist">Четыре поля — этого достаточно, чтобы начать разговор.</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm text-white/70">Имя</span>
                        <input name="name" required autoComplete="given-name" maxLength={60} className={field} placeholder="Как к вам обращаться" />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm text-white/70">Телефон или способ связи</span>
                        <input name="contact" required maxLength={80} className={field} placeholder="+7… или @username" />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/70">Направление интереса</span>
                      <select name="interest" className={`${field} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23A6FF24%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10`} defaultValue={interestOptions[0]}>
                        {interestOptions.map((o) => <option key={o} value={o} className="bg-graphite">{o}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/70">Кратко о задаче</span>
                      <textarea name="task" rows={4} maxLength={800} className={`${field} resize-none`} placeholder="Например: хотим, чтобы заявки с сайта сразу попадали к менеджеру" />
                    </label>
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-white/50">
                      <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#A6FF24]" />
                      <span>Согласен на обработку указанных данных только для ответа на это обращение. Мы не передаём их третьим лицам.</span>
                    </label>
                    <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
                      {status === "sending" ? "Отправляем…" : "Отправить заявку"} <Icon name="arrow" className="btn-arrow h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
