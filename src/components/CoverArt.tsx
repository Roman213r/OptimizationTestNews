import type { Article } from "@/types/news";

const categoryTone: Record<Article["category"], string> = {
  fsd: "from-[#07161c] via-[#0c2a33] to-[#e31937]",
  hardware: "from-[#121418] via-[#2a3038] to-[#9aa3ad]",
  robotaxi: "from-[#1a1408] via-[#5c4316] to-[#d7b15c]",
  robotics: "from-[#101014] via-[#3a3a42] to-[#ececec]",
  energy: "from-[#07140e] via-[#12351f] to-[#7cffb2]",
  inventions: "from-[#14060a] via-[#4a0d18] to-[#e31937]",
};

function MotifMark({ motif }: { motif: Article["motif"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (motif) {
    case "radar":
      return (
        <g {...common}>
          <circle cx="32" cy="32" r="6" />
          <circle cx="32" cy="32" r="14" opacity="0.7" />
          <circle cx="32" cy="32" r="22" opacity="0.4" />
          <path d="M32 32 L48 18" />
        </g>
      );
    case "chip":
      return (
        <g {...common}>
          <rect x="18" y="18" width="28" height="28" rx="3" />
          <rect x="24" y="24" width="16" height="16" />
          <path d="M26 18 V12 M32 18 V10 M38 18 V12 M26 46 V52 M32 46 V54 M38 46 V52 M18 26 H12 M18 32 H10 M18 38 H12 M46 26 H52 M46 32 H54 M46 38 H52" />
        </g>
      );
    case "cab":
      return (
        <g {...common}>
          <path d="M14 40 H50 L46 28 L36 20 H28 L18 28 Z" />
          <circle cx="22" cy="42" r="4" />
          <circle cx="42" cy="42" r="4" />
          <path d="M28 20 L30 28 H38" />
        </g>
      );
    case "robot":
      return (
        <g {...common}>
          <rect x="22" y="14" width="20" height="18" rx="3" />
          <circle cx="28" cy="23" r="2" fill="currentColor" />
          <circle cx="36" cy="23" r="2" fill="currentColor" />
          <path d="M32 32 V40 M22 44 H42 M22 40 H42 M16 36 L22 40 M48 36 L42 40" />
        </g>
      );
    case "cell":
      return (
        <g {...common}>
          <rect x="16" y="18" width="32" height="32" rx="4" />
          <path d="M24 18 V12 H40 V18 M24 30 H40 M24 38 H40 M32 30 V46" />
        </g>
      );
    case "truck":
      return (
        <g {...common}>
          <path d="M8 38 H28 V22 H46 L56 32 V38 H52" />
          <circle cx="18" cy="42" r="4" />
          <circle cx="44" cy="42" r="4" />
          <path d="M28 22 V38" />
        </g>
      );
    case "wing":
      return (
        <g {...common}>
          <path d="M8 36 L32 18 L56 36" />
          <path d="M18 36 H46 L42 44 H22 Z" />
          <path d="M32 18 V12" />
        </g>
      );
    case "camera":
      return (
        <g {...common}>
          <rect x="12" y="22" width="40" height="24" rx="4" />
          <circle cx="32" cy="34" r="8" />
          <circle cx="32" cy="34" r="3" fill="currentColor" />
          <path d="M22 22 L26 16 H38 L42 22" />
        </g>
      );
    case "grid":
      return (
        <g {...common}>
          <rect x="16" y="16" width="32" height="32" />
          <path d="M16 32 H48 M32 16 V48 M16 24 H48 M16 40 H48 M24 16 V48 M40 16 V48" />
        </g>
      );
    case "fleet":
      return (
        <g {...common}>
          <path d="M10 40 H24 L22 32 H12 Z" />
          <path d="M26 38 H42 L40 28 H28 Z" />
          <path d="M44 36 H58 L56 24 H46 Z" />
        </g>
      );
    case "steer":
      return (
        <g {...common}>
          <circle cx="32" cy="32" r="18" />
          <circle cx="32" cy="32" r="6" />
          <path d="M32 14 V26 M18 40 L26 34 M46 40 L38 34" />
        </g>
      );
    default:
      return (
        <g {...common}>
          <path d="M32 12 L36 26 H50 L38 34 L42 48 L32 40 L22 48 L26 34 L14 26 H28 Z" />
        </g>
      );
  }
}

type CoverArtProps = {
  article: Article;
  className?: string;
  size?: "hero" | "card" | "wide" | "banner";
};

const heightBySize = {
  hero: "h-[min(68vh,620px)]",
  card: "h-48",
  wide: "h-56 md:h-auto md:min-h-56",
  banner: "h-72 sm:h-96",
};

export function CoverArt({
  article,
  className = "",
  size = "card",
}: CoverArtProps) {
  const height = heightBySize[size];

  return (
    <div
      className={`cover-art relative overflow-hidden ${height} ${className}`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${categoryTone[article.category]}`}
      />
      <div className="absolute inset-0 opacity-40 mix-blend-overlay [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [transform:perspective(400px)_rotateX(62deg)_scale(1.8)_translateY(-20%)]" />
      <div className="absolute -right-10 -bottom-16 text-white/25">
        <svg viewBox="0 0 64 64" className="h-56 w-56">
          <MotifMark motif={article.motif} />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
      <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] text-white/80 uppercase">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7cffb2] shadow-[0_0_10px_#7cffb2]" />
        SIG / {article.hardware}
      </div>
      {article.version ? (
        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.22em] text-white/55">
          {article.version}
        </div>
      ) : null}
      <div className="absolute right-6 bottom-5 font-display text-5xl text-white/10 select-none">
        {article.category.toUpperCase()}
      </div>
    </div>
  );
}
