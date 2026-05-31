import Hero from "@/components/Hero";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capire l'Intelligenza Artificiale",
  description:
    "Esplora l'intelligenza artificiale tra tecnica, etica e filosofia.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero occupa tutta la prima schermata */}
      <Hero />

      {/* ── INTRO — colonna centrata ──────────────────────────────── */}
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 pt-16 sm:pt-20">
        <section className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Capire l&apos;intelligenza artificiale
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            L&apos;intelligenza artificiale è una delle tecnologie più influenti
            della nostra epoca. Dai sistemi di raccomandazione agli assistenti
            digitali fino ai modelli generativi, gli algoritmi stanno
            trasformando il modo in cui lavoriamo, pensiamo e prendiamo
            decisioni.
          </p>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Questo sito esplora l&apos;AI da due prospettive complementari:
            quella <strong className="text-ink font-medium">tecnica</strong>,
            che spiega come funzionano gli algoritmi, e quella{" "}
            <strong className="text-ink font-medium">etica e filosofica</strong>,
            che analizza il loro impatto sulla società e sul pensiero umano.
          </p>
        </section>
      </div>

      {/* ── LE DUE SEZIONI — pannelli colorati full-bleed ─────────── */}
      <section className="mt-16 sm:mt-24" aria-label="Le due sezioni">
        <h2 className="text-xs tracking-widest uppercase text-ink-faint text-center mb-6 sm:mb-8 px-4">
          Cosa trovi qui
        </h2>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 px-4 sm:px-6">
          {/* Fondamenti — pannello verde */}
          <Link
            href="/fondamenti"
            className="group relative overflow-hidden rounded-3xl text-on-dark px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 min-h-[320px] sm:min-h-[580px] flex flex-col justify-between transition-colors duration-300"
          >
            {/* Immagine di sfondo — public/img/fondamenti.jpg. Nessun velo sopra (scelta utente). */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/fondamenti.jpg')" }} aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#f4f3ef_1px,transparent_1px),linear-gradient(to_bottom,#f4f3ef_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden="true" />
            <span className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-on-dark/30 pointer-events-none" aria-hidden="true" />

            <div className="relative">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-none mb-4 text-cream">
                Fondamenti
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-on-dark max-w-md">
                Machine learning, deep learning, reti neurali e funzionamento dei modelli moderni. Dalle basi al training.
              </p>
            </div>

            <span className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-cream">
              Leggi
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </Link>

          {/* Etica — pannello malva */}
          <Link
            href="/etica"
            className="group relative overflow-hidden rounded-3xl text-on-dark px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 min-h-[320px] sm:min-h-[380px] flex flex-col justify-between transition-colors duration-300"
          >
            {/* Immagine di sfondo — public/img/etica.jpg. Nessun velo sopra (scelta utente). */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/etica.jpg')" }} aria-hidden="true" />
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#f4f3ef_1px,transparent_1px),linear-gradient(to_bottom,#f4f3ef_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden="true" />
            <span className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-on-dark/30 pointer-events-none" aria-hidden="true" />

            <div className="relative">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-none mb-4 text-cream">
                Etica
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-on-dark max-w-md">
                Bias algoritmico, responsabilità delle decisioni automatiche e impatto dell&apos;AI sulla società.
              </p>
            </div>

            <span className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-cream">
              Leggi
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ── RESTO — colonna centrata ──────────────────────────────── */}
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 py-16 sm:py-24 space-y-16 sm:space-y-24">

        {/* ── COSA TROVERAI — lista pulita ──────────────────────────── */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mb-6 sm:mb-8">
            Cosa troverai
          </h2>
          <ul className="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed">
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-grass shrink-0" aria-hidden="true" />
              Introduzioni ai concetti fondamentali dell&apos;intelligenza artificiale.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-grass shrink-0" aria-hidden="true" />
              Approfondimenti tecnici su modelli, dataset e processi di addestramento.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-grass shrink-0" aria-hidden="true" />
              Analisi dei dilemmi etici legati all&apos;automazione e alla decisione algoritmica.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-grass shrink-0" aria-hidden="true" />
              Riflessioni sul rapporto tra tecnologia, conoscenza e pensiero umano.
            </li>
          </ul>
        </section>

        {/* ── DOMANDA FINALE ────────────────────────────────────────── */}
        <section className="relative max-w-xl mx-auto text-center pt-12 sm:pt-16">
          {/* griglia decorativa + angoli crosshair */}
          <div className="absolute inset-x-0 top-0 h-px bg-line/60" aria-hidden="true" />
          <span className="absolute top-0 left-0 -translate-y-1/2 w-4 h-4 border-t-2 border-l-2 border-ink-faint" aria-hidden="true" />
          <span className="absolute top-0 right-0 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-ink-faint" aria-hidden="true" />
          <p className="text-xs tracking-widest uppercase text-ink-faint mb-4">
            Una domanda aperta
          </p>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
            L&apos;intelligenza artificiale diventa ogni anno più potente.
            Ma comprendiamo davvero cosa significa creare sistemi
            che apprendono e prendono decisioni?
          </p>
        </section>

      </div>
    </>
  );
}
