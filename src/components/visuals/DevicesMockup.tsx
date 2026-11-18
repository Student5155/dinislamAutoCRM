import { LogoMark } from "@/components/ui/Logo";

/** Мини-сайт внутри устройства — CSS-графика без изображений */
function MiniSite({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#071520] text-white">
      <div className="absolute -right-6 top-4 h-24 w-24 rounded-full bg-lime/20 blur-2xl" />
      <div className={`flex items-center justify-between ${compact ? "px-2.5 py-2" : "px-4 py-3"}`}>
        <LogoMark className={compact ? "h-3" : "h-4"} />
        {compact ? (
          <span className="flex flex-col gap-[2px]"><i className="block h-[1.5px] w-2.5 bg-white/70" /><i className="block h-[1.5px] w-2.5 bg-white/70" /></span>
        ) : (
          <span className="flex gap-2.5">{[16, 20, 14].map((w, i) => <i key={i} className="block h-1 rounded bg-white/30" style={{ width: w }} />)}<i className="block h-2.5 w-9 rounded-full bg-lime" /></span>
        )}
      </div>
      <div className={compact ? "px-2.5 pt-2" : "px-4 pt-3"}>
        <div className={`rounded bg-white/85 ${compact ? "h-1.5 w-14" : "h-2.5 w-28"}`} />
        <div className={`mt-1 rounded bg-lime ${compact ? "h-1.5 w-10" : "h-2.5 w-20"}`} />
        <div className={`mt-2 rounded bg-white/20 ${compact ? "h-1 w-16" : "h-1.5 w-36"}`} />
        <div className={`mt-1 rounded bg-white/20 ${compact ? "h-1 w-12" : "h-1.5 w-28"}`} />
        <div className={`mt-3 rounded-full bg-lime ${compact ? "h-2.5 w-12" : "h-4 w-20"}`} />
      </div>
      <div className={`absolute inset-x-0 bottom-0 grid gap-1.5 ${compact ? "grid-cols-2 p-2.5" : "grid-cols-3 p-4"}`}>
        {Array.from({ length: compact ? 2 : 3 }).map((_, i) => (
          <div key={i} className="rounded-md border border-white/10 bg-white/[0.04] p-1.5">
            <div className="mb-1 aspect-[4/3] rounded bg-gradient-to-br from-mint/30 to-lime/10" />
            <div className="h-1 w-3/4 rounded bg-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DevicesMockup() {
  return (
    <div className="relative mx-auto aspect-[1.25] w-full max-w-[560px]" role="img" aria-label="Пример адаптивного сайта на компьютере, планшете и смартфоне">
      <div className="absolute left-1/2 top-[40%] h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-lime/15 blur-3xl" />
      {/* Монитор */}
      <div className="absolute left-[2%] top-[4%] w-[78%]">
        <div className="rounded-xl border border-white/15 bg-[#0d1b26] p-[1.6%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
          <div className="aspect-[16/10] overflow-hidden rounded-md"><MiniSite /></div>
        </div>
        <div className="mx-auto h-[6%] w-[16%] bg-gradient-to-b from-white/15 to-white/5" style={{ aspectRatio: "3/1" }} />
        <div className="mx-auto h-1.5 w-[30%] rounded-full bg-white/15" />
      </div>
      {/* Планшет */}
      <div className="animate-float absolute bottom-[6%] right-[14%] w-[30%]" style={{ animationDelay: "-3s" }}>
        <div className="rounded-[14px] border border-white/20 bg-[#0d1b26] p-[5%] shadow-[0_24px_50px_-16px_rgba(0,0,0,0.95)]">
          <div className="aspect-[3/4] overflow-hidden rounded-[8px]"><MiniSite compact /></div>
        </div>
      </div>
      {/* Смартфон */}
      <div className="animate-float absolute bottom-[2%] right-[0%] w-[17%]">
        <div className="rounded-[14px] border border-white/25 bg-[#0d1b26] p-[6%] shadow-[0_24px_50px_-16px_rgba(0,0,0,0.95)]">
          <div className="aspect-[9/19] overflow-hidden rounded-[9px]"><MiniSite compact /></div>
        </div>
      </div>
    </div>
  );
}
