"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Стрічка" },
  { href: "/about", label: "Про сигнал" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors ${
              active ? "text-white" : "text-white/45 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
