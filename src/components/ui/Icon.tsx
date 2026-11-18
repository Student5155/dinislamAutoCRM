/** Набор линейных векторных иконок в едином стиле (stroke 1.6) */
const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  phone: <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5Z" /></>,
  crm: <><rect x="3.5" y="4" width="17" height="16" rx="2.5" /><path d="M8.5 4v16M11.5 9h6M11.5 13h6M11.5 17h3.5" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" /></>,
  bot: <><rect x="4.5" y="7.5" width="15" height="11" rx="3.5" /><path d="M12 7.5V4.5M9.5 12.5v1M14.5 12.5v1M2.5 12v3M21.5 12v3" /><circle cx="12" cy="3.8" r="0.9" /></>,
  visit: <><rect x="3" y="4.5" width="18" height="13" rx="2" /><path d="M3 8.5h18M8 21h8M12 17.5V21" /></>,
  form: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8.5 8h7M8.5 12h7M8.5 16h4" /></>,
  inbox: <><path d="M3.5 13.5 6 5.5h12l2.5 8V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19v-5.5Z" /><path d="M3.5 13.5h5l1.2 2.5h4.6l1.2-2.5h5" /></>,
  client: <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c.9-3.6 3.8-5.5 7.5-5.5s6.6 1.9 7.5 5.5" /></>,
  bell: <><path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2h-14l1.5-2Z" /><path d="M10 20.5h4" /></>,
  task: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="m7.5 15 3.5-4 3 2.5 5-6" /></>,
  retail: <><path d="M4 9.5 5.5 4.5h13L20 9.5" /><path d="M4 9.5h16v1a2.7 2.7 0 0 1-5.3 0 2.7 2.7 0 0 1-5.4 0A2.7 2.7 0 0 1 4 10.5v-1Z" /><path d="M5.5 13v7h13v-7M10 20v-4h4v4" /></>,
  build: <><path d="M3.5 20.5h17M5.5 20.5V10l6.5-5 6.5 5v10.5" /><path d="M9.5 20.5V14h5v6.5" /></>,
  factory: <><path d="M3.5 20.5V10l5 3V10l5 3V6h4v14.5Z" /><path d="M3.5 20.5h17M17.5 6V3.5" /></>,
  service: <><path d="M14.5 6.5a4 4 0 0 0-5.3 5.2L4 17v3h3l5.3-5.2a4 4 0 0 0 5.2-5.3l-2.3 2.3-2.4-.6-.6-2.4 2.3-2.3Z" /></>,
  realty: <><path d="M4 11.5 12 5l8 6.5" /><path d="M6 10v10.5h12V10" /><rect x="10" y="13.5" width="4" height="4" rx="0.6" /></>,
  auto: <><path d="M4 15.5v-3l1.8-4.5a1.5 1.5 0 0 1 1.4-1h9.6a1.5 1.5 0 0 1 1.4 1L20 12.5v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" /><circle cx="8" cy="16.5" r="1.8" /><circle cx="16" cy="16.5" r="1.8" /><path d="M4.5 12.5h15" /></>,
  edu: <><path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" /><path d="M6.5 11.5V16c1.5 1.5 3.4 2.2 5.5 2.2s4-.7 5.5-2.2v-4.5M21.5 9.5v5" /></>,
  logistics: <><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></>,
  smb: <><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2M3.5 12.5h17" /></>,
  spark: <path d="M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14l-6.7-2 6.7-2L12 3.5Z" />,
  user: <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c.9-3.6 3.8-5.5 7.5-5.5s6.6 1.9 7.5 5.5" /></>,
  shield: <path d="M12 3.5 19 6v5.5c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6l7-2.5Z" />,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.6 }: { name: IconName | string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

/** Логотипы мессенджеров — упрощённые знаки для кнопок связи */
export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M21.4 4.3 18.3 19.4c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.2 13.3 1.5 11.8c-1-.3-1-1 .2-1.5L20 3.2c.9-.3 1.6.2 1.4 1.1Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.2 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
    </svg>
  );
}

export function MaxIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 17V7.5l6 6.5 6-6.5V17" />
    </svg>
  );
}

/** Сырые контуры иконки — для вставки внутрь собственных SVG-схем */
export function iconPaths(name: string) {
  return paths[name];
}
