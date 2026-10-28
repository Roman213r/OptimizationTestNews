export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display tracking-[0.2em]">TESLA PULSE</p>
          <p className="mt-2 max-w-md text-sm text-white/45">
            Незалежна стрічка про оновлення розумних приладів і винаходів
            Tesla. FSD лишається supervised — людина за кермом обов’язкова.
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">
          Сигнал з автопарку · 2026
        </p>
      </div>
    </footer>
  );
}
