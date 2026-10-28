import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про сигнал",
  description:
    "Tesla Pulse — стрічка новин про оновлення розумних приладів і винаходів Tesla.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <p className="font-mono text-[10px] tracking-[0.32em] text-[#e31937] uppercase">
        Маніфест
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Про Tesla Pulse</h1>
      <div className="mt-8 space-y-5 text-base leading-8 text-white/70">
        <p>
          Tesla Pulse збирає оновлення розумних приладів і винаходів для
          автомобілів Tesla в одну стрічку: автопілот, бортові чипи, роботаксі,
          гуманоїд Optimus, накопичувачі енергії й нові кузови.
        </p>
        <p>
          Це не офіційний канал Tesla. Матеріали написані як незалежна редакційна
          стрічка українською — з акцентом на те, що змінюється в машині як у
          приладі: камери, моделі, безпекові функції, флот і заводи, які ці
          прилади народжують.
        </p>
        <p>
          Full Self-Driving у новинах позначений як Supervised: система може
          вести авто, але не знімає відповідальності з людини за кермом.
        </p>
      </div>
    </main>
  );
}
