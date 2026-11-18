import { useId } from "react";

/**
 * Векторная версия существующего знака DinislamAutoCRM:
 * буква «D», стрелка роста и «пиксели» — без изменения формы оригинала.
 */
export function LogoMark({ className = "", glow = false }: { className?: string; glow?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="575 375 775 620" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`d${id}`} x1="0.15" y1="0.05" x2="0.95" y2="0.95">
          <stop offset="0.38" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#c8ff7a" />
          <stop offset="1" stopColor="#8be83a" />
        </linearGradient>
        <linearGradient id={`a${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#e9f5e0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9ae85a" />
          <stop offset="1" stopColor="#5aa832" />
        </linearGradient>
        {glow && (
          <filter id={`g${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" result="b" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.65  0 0 0 0 1  0 0 0 0 0.14  0 0 0 0.55 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      <g filter={glow ? `url(#g${id})` : undefined}>
        <path fill={`url(#d${id})`} d="M732 388H1045A297 297 0 0 1 1045 983H932L1042 873A185 185 0 0 0 1045 501H732Z" />
        <path fill={`url(#a${id})`} d="M1101 612 860 638 927 706 658 977 812 977 1004 786 1073 855Z" />
        <g fill={`url(#s${id})`}>
          <rect x="742" y="555" width="66" height="66" rx="5" />
          <rect x="658" y="646" width="54" height="54" rx="5" />
          <rect x="589" y="699" width="46" height="34" rx="4" />
          <rect x="628" y="734" width="81" height="80" rx="5" />
        </g>
      </g>
    </svg>
  );
}

export function Logo({ className = "", withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-full w-auto" />
      {withText && (
        <span className="text-[1.05rem] font-semibold leading-none tracking-[-0.01em] sm:text-[1.15rem]">
          DinislamAuto<span className="text-lime">CRM</span>
        </span>
      )}
    </span>
  );
}
