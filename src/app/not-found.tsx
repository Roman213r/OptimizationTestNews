import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="font-mono text-[10px] tracking-[0.32em] text-[#e31937] uppercase">
        404 / NO SIGNAL
      </p>
      <h1 className="mt-3 font-display text-4xl">Цього кадру немає в стрічці</h1>
      <p className="mt-4 max-w-md text-white/55">
        Матеріал зник або адреса хибна. Поверніться до живого пульсу оновлень.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit border border-white/20 px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase hover:border-white"
      >
        На головну
      </Link>
    </main>
  );
}
