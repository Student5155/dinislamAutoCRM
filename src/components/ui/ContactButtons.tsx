import { site } from "@/config/site";
import { Icon, MaxIcon, TelegramIcon, WhatsAppIcon } from "./Icon";

type Channel = {
  id: "phone" | "max" | "telegram" | "whatsapp";
  label: string;
  hint: string;
  href: string;
  icon: React.ReactNode;
  external: boolean;
};

export function getChannels(): Channel[] {
  return [
    { id: "phone", label: "Позвонить", hint: site.contacts.phone, href: site.contacts.phoneHref, icon: <Icon name="phone" className="h-5 w-5" />, external: false },
    { id: "max", label: "MAX", hint: site.contacts.max ? "Написать в MAX" : "Ссылка скоро появится", href: site.contacts.max, icon: <MaxIcon className="h-5 w-5" />, external: true },
    { id: "telegram", label: "Telegram", hint: "Написать в Telegram", href: site.contacts.telegram, icon: <TelegramIcon className="h-5 w-5" />, external: true },
    { id: "whatsapp", label: "WhatsApp", hint: "Написать в WhatsApp", href: site.contacts.whatsapp, icon: <WhatsAppIcon className="h-5 w-5" />, external: true },
  ];
}

/** Кнопки связи. Если ссылка MAX ещё не задана, кнопка отображается неактивной. */
export function ContactButtons({ layout = "row", onClick }: { layout?: "row" | "grid" | "cards"; onClick?: () => void }) {
  const channels = getChannels();
  const wrap =
    layout === "cards" ? "grid grid-cols-[minmax(0,1fr)] gap-3 xs:grid-cols-[repeat(2,minmax(0,1fr))]" : layout === "grid" ? "grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3" : "flex flex-wrap gap-3";

  return (
    <ul className={wrap}>
      {channels.map((c) => {
        const disabled = !c.href;
        const base =
          layout === "cards"
            ? "group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-lime/50 hover:bg-lime/[0.05]"
            : "group flex min-h-[52px] items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.02] px-4 transition-colors hover:border-lime/50 hover:bg-lime/[0.05]";
        const content = (
          <>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime transition-colors group-hover:bg-lime group-hover:text-ink">{c.icon}</span>
            <span className="min-w-0">
              <span className="block text-[0.95rem] font-semibold">{c.label}</span>
              {layout === "cards" && <span className="block truncate text-xs text-mist">{c.hint}</span>}
            </span>
            {layout === "cards" && !disabled && <Icon name="arrowUpRight" className="ml-auto h-4 w-4 text-mist transition-colors group-hover:text-lime" />}
          </>
        );
        return (
          <li key={c.id}>
            {disabled ? (
              <span className={`${base} cursor-not-allowed opacity-50 hover:!translate-y-0 hover:!border-white/[0.08] hover:!bg-white/[0.02]`} aria-disabled="true" title="Ссылка на профиль MAX будет добавлена">
                {content}
              </span>
            ) : (
              <a
                href={c.href}
                className={base}
                onClick={onClick}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${c.label}: ${c.hint}`}
              >
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
