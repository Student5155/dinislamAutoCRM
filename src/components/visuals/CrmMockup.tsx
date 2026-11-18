import { LogoMark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

const columns = [
  { title: "Новые", tone: "bg-mint", cards: [{ t: "Заявка с сайта", m: "Расчёт стоимости" }, { t: "Сообщение в Telegram", m: "Вопрос по услуге" }] },
  { title: "В работе", tone: "bg-lime", cards: [{ t: "Коммерческое предложение", m: "Срок: сегодня" }, { t: "Повторное обращение", m: "История: 3 контакта" }] },
  { title: "Завершено", tone: "bg-white/60", cards: [{ t: "Договор подписан", m: "Задача закрыта" }] },
];

/** Пример CRM-интерфейса (иллюстрация, без реальных данных) */
export function CrmMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]" role="img" aria-label="Пример интерфейса CRM: воронка заявок, задачи и аналитика">
      <div className="absolute -inset-6 rounded-[2rem] bg-lime/10 blur-3xl" />
      <div className="relative flex overflow-hidden rounded-2xl border border-white/10 bg-[#0a1823] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]">
        {/* Боковая панель */}
        <aside className="hidden w-[22%] shrink-0 flex-col gap-1 border-r border-white/[0.06] p-3 xs:flex">
          <LogoMark className="mb-3 h-5 self-start" />
          {[
            ["chart", "Главная"],
            ["client", "Клиенты"],
            ["crm", "Сделки"],
            ["task", "Задачи"],
            ["chart", "Аналитика"],
          ].map(([ic, l], i) => (
            <span key={l} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[0.62rem] sm:text-[0.7rem] ${i === 2 ? "bg-lime text-ink font-semibold" : "text-white/55"}`}>
              <Icon name={ic} className="h-3 w-3 shrink-0" />{l}
            </span>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold sm:text-sm">Сделки</p>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.6rem] text-mist">Пример интерфейса</span>
          </div>
          {/* Канбан */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {columns.map((c) => (
              <div key={c.title} className="rounded-xl bg-white/[0.03] p-1.5 sm:p-2">
                <p className="mb-1.5 flex items-center gap-1.5 text-[0.6rem] text-white/60 sm:text-[0.68rem]"><i className={`h-1.5 w-1.5 rounded-full ${c.tone}`} />{c.title}</p>
                <div className="space-y-1.5">
                  {c.cards.map((card) => (
                    <div key={card.t} className="rounded-lg border border-white/[0.07] bg-[#0f2130] p-1.5 sm:p-2">
                      <p className="text-[0.58rem] font-semibold leading-tight sm:text-[0.66rem]">{card.t}</p>
                      <p className="mt-0.5 text-[0.52rem] text-mist sm:text-[0.6rem]">{card.m}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Аналитика */}
          <div className="mt-2.5 rounded-xl bg-white/[0.03] p-2.5 sm:p-3">
            <div className="flex items-center justify-between text-[0.6rem] text-white/60 sm:text-[0.68rem]">
              <span>Заявки по неделям</span><span className="text-lime">динамика</span>
            </div>
            <div className="mt-2 flex h-16 items-end gap-1.5 sm:h-20">
              {[35, 48, 40, 62, 55, 70, 66, 82, 74, 90].map((h, i) => (
                <span key={i} className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-lime/30 to-lime [animation:bar-grow_1.2s_var(--ease-out-expo)_both]" style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Карточка уведомления */}
      <div className="glass animate-float absolute -bottom-5 -left-2 flex items-center gap-2.5 rounded-2xl px-3 py-2.5 sm:-left-8">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-ink"><Icon name="bell" className="h-4 w-4" /></span>
        <span className="text-[0.7rem] leading-tight sm:text-xs"><b className="block">Новая задача</b><span className="text-mist">Перезвонить клиенту</span></span>
      </div>
    </div>
  );
}
