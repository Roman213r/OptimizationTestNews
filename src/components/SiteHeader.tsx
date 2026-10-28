import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#050506]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center border border-white/20">
            <span className="absolute inset-x-1 top-1/2 h-px bg-[#e31937]" />
            <span className="font-display text-sm tracking-widest">T</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-[0.22em]">
              TESLA PULSE
            </span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.28em] text-white/45 uppercase">
              Стрічка винаходів
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLinks />
          <span className="ml-3 hidden items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#7cffb2] uppercase sm:flex">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#7cffb2]" />
            LIVE 2026.38
          </span>
        </nav>
      </div>
    </header>
  );
}
