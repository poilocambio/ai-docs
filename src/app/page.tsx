import React from "react";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Esplora l'intelligenza artificiale tra tecnica, etica e filosofia.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero occupa tutta la prima schermata */}
      <Hero />

      {/* Contenuto della home — layout proprio, non DefaultPage */}
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 py-16 sm:py-20 space-y-16 sm:space-y-24">

        {/* ── INTRO ─────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black">
            Capire l'intelligenza artificiale
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
            L'intelligenza artificiale è una delle tecnologie più influenti
            della nostra epoca. Dai sistemi di raccomandazione agli assistenti
            digitali fino ai modelli generativi, gli algoritmi stanno
            trasformando il modo in cui lavoriamo, pensiamo e prendiamo
            decisioni.
          </p>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
            Questo sito esplora l'AI da due prospettive complementari:
            quella <strong className="text-black font-medium">tecnica</strong>,
            che spiega come funzionano gli algoritmi, e quella{" "}
            <strong className="text-black font-medium">etica e filosofica</strong>,
            che analizza il loro impatto sulla società e sul pensiero umano.
          </p>
        </section>

        {/* ── LE TRE SEZIONI ────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs tracking-widest uppercase text-neutral-400 text-center mb-6 sm:mb-8">
            Cosa trovi qui
          </h2>
          <CardGrid
            columns={3}
            cards={[
              {
                title: "Tecnica",
                description:
                  "Machine learning, deep learning, reti neurali e funzionamento dei modelli moderni. Dalle basi al training.",
                href: "/tecnico",
              },
              {
                title: "Etica",
                description:
                  "Bias algoritmico, responsabilità delle decisioni automatiche e impatto dell'AI sulla società.",
                href: "/etica",
              },
              {
                title: "Filosofia",
                description:
                  "Cos'è davvero l'intelligenza? Le macchine possono comprendere o stanno solo calcolando?",
              },
            ]}
          />
        </section>

        {/* ── COSA TROVERAI — lista pulita ──────────────────────────── */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-black mb-6 sm:mb-8">
            Cosa troverai
          </h2>
          <ul className="space-y-4 text-sm sm:text-base text-neutral-500 leading-relaxed">
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" aria-hidden="true" />
              Introduzioni ai concetti fondamentali dell'intelligenza artificiale.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" aria-hidden="true" />
              Approfondimenti tecnici su modelli, dataset e processi di addestramento.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" aria-hidden="true" />
              Analisi dei dilemmi etici legati all'automazione e alla decisione algoritmica.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" aria-hidden="true" />
              Riflessioni sul rapporto tra tecnologia, conoscenza e pensiero umano.
            </li>
          </ul>
        </section>

        {/* ── DOMANDA FINALE ────────────────────────────────────────── */}
        <section className="max-w-xl mx-auto text-center border-t border-neutral-100 pt-12 sm:pt-16">
          <p className="text-xs tracking-widest uppercase text-neutral-400 mb-4">
            Una domanda aperta
          </p>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            L'intelligenza artificiale diventa ogni anno più potente.
            Ma comprendiamo davvero cosa significa creare sistemi
            che apprendono e prendono decisioni?
          </p>
        </section>

      </div>
    </>
  );
}