"use client";

import { useReducedMotion } from "framer-motion";
import { iconPaths } from "@/components/ui/Icon";

type N = { id: string; x: number; y: number; label: string; icon: string; hub?: boolean };
const nodes: N[] = [
  { id: "site", x: 70, y: 70, label: "Сайт", icon: "visit" },
  { id: "msg", x: 70, y: 190, label: "Мессенджер", icon: "bot" },
  { id: "call", x: 70, y: 310, label: "Звонок", icon: "phone" },
  { id: "crm", x: 260, y: 190, label: "CRM", icon: "crm", hub: true },
  { id: "bell", x: 450, y: 70, label: "Уведомление", icon: "bell" },
  { id: "task", x: 450, y: 190, label: "Задача", icon: "task" },
  { id: "rep", x: 450, y: 310, label: "Отчёт", icon: "chart" },
];
const edges = [
  ["site", "crm"], ["msg", "crm"], ["call", "crm"], ["crm", "bell"], ["crm", "task"], ["crm", "rep"],
];
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const pathFor = (a: N, b: N) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x + 34} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x - 34} ${b.y}`;
};

/** Анимированная блок-схема: каналы → CRM → действия */
export function AutomationFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div className="absolute inset-0 rounded-full bg-mint/10 blur-3xl" />
      <svg viewBox="0 0 520 380" className="relative w-full" role="img" aria-label="Схема автоматизации: заявки с сайта, мессенджеров и звонков попадают в CRM, которая создаёт уведомления, задачи и отчёты">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0" stopColor="#69D9B4" stopOpacity="0.25" />
            <stop offset="1" stopColor="#A6FF24" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="pulse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#A6FF24" />
            <stop offset="1" stopColor="#A6FF24" stopOpacity="0" />
          </radialGradient>
        </defs>
        {edges.map(([a, b], i) => {
          const d = pathFor(byId[a], byId[b]);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="url(#edge)" strokeWidth="1.5" />
              <path d={d} fill="none" stroke="#A6FF24" strokeOpacity="0.5" strokeWidth="1.5" className="animate-dash" />
              {!reduce && (
                <circle r="7" fill="url(#pulse)">
                  <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i < 3 ? i * 0.4 : 1.3 + (i - 3) * 0.35}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
            {n.hub && <circle r="62" fill="#A6FF24" fillOpacity="0.07" className="animate-pulse-soft" />}
            <rect x={n.hub ? -46 : -34} y={n.hub ? -46 : -34} width={n.hub ? 92 : 68} height={n.hub ? 92 : 68} rx={n.hub ? 24 : 18}
              fill="#101F2B" stroke={n.hub ? "#A6FF24" : "rgba(255,255,255,0.14)"} strokeWidth={n.hub ? 2 : 1} />
            <g transform={`translate(${n.hub ? -16 : -12} ${n.hub ? -24 : -20}) scale(${n.hub ? 1.35 : 1})`} fill="none" stroke={n.hub ? "#A6FF24" : "#fff"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {iconPaths(n.icon)}
            </g>
            <text y={n.hub ? 30 : 22} textAnchor="middle" fill={n.hub ? "#fff" : "rgba(255,255,255,0.75)"} fontSize={n.hub ? 13 : 10.5} fontWeight={600} fontFamily="var(--font-manrope)">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
