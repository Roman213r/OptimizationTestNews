const stats = [
  { label: "Флот камер", value: "10M", hint: "машин у мережі" },
  { label: "FSD build", value: "14.3.13", hint: "HW4 / AI4" },
  { label: "Cybercab", value: "300+", hint: "у ротації Остіна" },
  { label: "AI5", value: "×10", hint: "обчислень vs AI4" },
];

export function SignalStats() {
  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px border border-white/8 bg-white/8 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#050506] px-4 py-5 sm:px-6">
          <p className="font-mono text-[10px] tracking-[0.26em] text-white/35 uppercase">
            {stat.label}
          </p>
          <p className="mt-2 font-display text-2xl tracking-wide text-white">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-white/40">{stat.hint}</p>
        </div>
      ))}
    </section>
  );
}
