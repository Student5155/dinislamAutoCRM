import type { ProjectVisual } from "@/content/portfolio";
import { LogoMark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

const Bar = ({ w, c = "bg-white/25", h = "h-1.5" }: { w: string; c?: string; h?: string }) => <i className={`block rounded ${h} ${c}`} style={{ width: w }} />;

/** Абстрактные обложки демонстрационных проектов — чистая CSS/SVG-графика */
export function ProjectArt({ visual }: { visual: ProjectVisual }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(120%_90%_at_80%_0%,rgba(166,255,36,0.16),transparent_55%),linear-gradient(160deg,#0f2130,#071520)]">
      <div className="grid-bg absolute inset-0 opacity-50" />
      {visual === "corporate" && (
        <div className="absolute inset-[10%] rounded-xl border border-white/10 bg-ink/80 p-4">
          <div className="flex items-center justify-between"><LogoMark className="h-3.5" /><span className="flex gap-2"><Bar w="18px" /><Bar w="22px" /><Bar w="16px" /></span></div>
          <div className="mt-5 grid grid-cols-[1.2fr_1fr] gap-4">
            <div><Bar w="85%" c="bg-white/80" h="h-2.5" /><div className="mt-1.5"><Bar w="60%" c="bg-lime" h="h-2.5" /></div><div className="mt-3 space-y-1"><Bar w="90%" /><Bar w="70%" /></div><i className="mt-4 block h-4 w-16 rounded-full bg-lime" /></div>
            <svg viewBox="0 0 100 80" className="w-full" aria-hidden="true"><path d="M10 70 L10 35 L45 12 L80 35 L80 70Z" fill="none" stroke="#69D9B4" strokeWidth="1.5" /><path d="M30 70V48h20v22M58 44h12v10H58z" fill="none" stroke="#A6FF24" strokeWidth="1.5" /><path d="M0 70h100" stroke="rgba(255,255,255,.3)" /></svg>
          </div>
        </div>
      )}
      {visual === "shop" && (
        <div className="absolute inset-[10%] grid grid-cols-3 gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-ink/80 p-2">
              <div className={`aspect-square rounded-md ${i % 3 === 1 ? "bg-lime/30" : "bg-mint/15"}`} />
              <div className="mt-1.5 space-y-1"><Bar w="80%" h="h-1" /><Bar w="45%" c="bg-lime" h="h-1" /></div>
            </div>
          ))}
          <span className="absolute -right-2 -top-3 grid h-9 w-9 place-items-center rounded-full bg-lime text-ink shadow-[0_0_24px_rgba(166,255,36,.5)]"><Icon name="retail" className="h-4 w-4" /></span>
        </div>
      )}
      {visual === "crm" && (
        <div className="absolute inset-[10%] grid grid-cols-3 gap-2">
          {[3, 2, 1].map((n, c) => (
            <div key={c} className="rounded-lg bg-white/[0.04] p-1.5">
              <i className={`mb-1.5 block h-1 w-8 rounded ${c === 1 ? "bg-lime" : "bg-mint/70"}`} />
              <div className="space-y-1.5">{Array.from({ length: n }).map((_, k) => <div key={k} className="rounded-md border border-white/10 bg-ink/80 p-1.5"><Bar w="80%" h="h-1" c="bg-white/50" /><div className="mt-1"><Bar w="50%" h="h-1" /></div></div>)}</div>
            </div>
          ))}
        </div>
      )}
      {visual === "flow" && (
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[[60, 60], [60, 140]].map(([x, y], i) => <path key={i} d={`M${x + 22} ${y} C 120 ${y}, 120 100, 128 100`} fill="none" stroke="#69D9B4" strokeOpacity=".6" strokeDasharray="4 5" />)}
          {[[240, 50], [240, 100], [240, 150]].map(([x, y], i) => <path key={i} d={`M172 100 C 200 100, 200 ${y}, ${x - 22} ${y}`} fill="none" stroke="#A6FF24" strokeOpacity=".7" />)}
          {[[60, 60], [60, 140], [240, 50], [240, 100], [240, 150]].map(([x, y], i) => <rect key={i} x={x - 20} y={y - 14} width="40" height="28" rx="8" fill="#101F2B" stroke="rgba(255,255,255,.2)" />)}
          <rect x="128" y="78" width="44" height="44" rx="12" fill="#A6FF24" />
          <text x="150" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill="#06121B">CRM</text>
        </svg>
      )}
      {visual === "landing" && (
        <div className="absolute inset-x-[18%] inset-y-[8%] rounded-xl border border-white/10 bg-ink/80 p-3">
          <Bar w="40%" c="bg-lime" h="h-1" />
          <div className="mt-3 space-y-1.5"><Bar w="90%" c="bg-white/80" h="h-2.5" /><Bar w="65%" c="bg-white/80" h="h-2.5" /></div>
          <div className="mt-4 space-y-2">{[0, 1, 2].map((i) => <div key={i} className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded bg-lime/20 text-[0.5rem] text-lime">{i + 1}</span><Bar w={`${70 - i * 10}%`} /></div>)}</div>
          <i className="mt-4 block h-4 w-20 rounded-full bg-lime" />
        </div>
      )}
      {visual === "bot" && (
        <div className="absolute inset-x-[22%] inset-y-[8%] space-y-2 rounded-2xl border border-white/10 bg-ink/80 p-3">
          <div className="w-3/4 rounded-xl rounded-bl-sm bg-white/[0.08] p-2"><Bar w="90%" h="h-1" c="bg-white/60" /><div className="mt-1"><Bar w="60%" h="h-1" /></div></div>
          <div className="ml-auto w-2/3 rounded-xl rounded-br-sm bg-lime p-2"><Bar w="80%" h="h-1" c="bg-ink/60" /></div>
          <div className="w-3/4 rounded-xl rounded-bl-sm bg-white/[0.08] p-2"><Bar w="85%" h="h-1" c="bg-white/60" /></div>
          <div className="flex gap-1.5 pt-1">{["Пн 10:00", "Вт 14:30"].map((t) => <span key={t} className="rounded-full border border-lime/40 px-2 py-0.5 text-[0.55rem] text-lime">{t}</span>)}</div>
        </div>
      )}
    </div>
  );
}
