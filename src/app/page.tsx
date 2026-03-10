import React from "react";
import Hero from "@/components/Hero";
import DefaultPage from "@/components/DefaultPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Docs - Home",
  description: "Home Page AI Docs",
};

export default function HomePage() {
  return (
    <div className="flex flex-col text-center">

      <Hero />

      <DefaultPage
        title="Di cosa parla questo sito"
        content={
          <>
            {/* INTRO */}
            <section className="mx-auto max-w-4xl px-6 mb-16">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Capire l'intelligenza artificiale
              </h2>

              <p className="text-neutral-600 leading-relaxed mb-4">
                L'intelligenza artificiale è una delle tecnologie più influenti
                della nostra epoca. Dai sistemi di raccomandazione agli assistenti
                digitali fino ai modelli generativi, gli algoritmi stanno
                trasformando il modo in cui lavoriamo, pensiamo e prendiamo
                decisioni.
              </p>

              <p className="text-neutral-600 leading-relaxed">
                Questo sito nasce per esplorare l'AI da due prospettive
                complementari: quella tecnica, che spiega come funzionano gli
                algoritmi, e quella filosofica ed etica, che analizza il loro
                impatto sulla società e sul pensiero umano.
              </p>
            </section>

            {/* SEZIONI PRINCIPALI */}
            <section className="grid md:grid-cols-3 gap-8 mx-auto max-w-6xl px-6 mb-20">

              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/50 transition-all bg-transparent">
                <h3 className="font-semibold text-lg mb-2">
                  Tecnica
                </h3>

                <p className="text-neutral-600">
                  Spiegazioni chiare di machine learning, deep learning,
                  reti neurali e funzionamento dei modelli moderni.
                </p>
              </div>

              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/50 transition-all bg-transparent">
                <h3 className="font-semibold text-lg mb-2">
                  Etica
                </h3>

                <p className="text-neutral-600">
                  Bias algoritmico, responsabilità delle decisioni
                  automatiche e impatto dell'AI sulla società.
                </p>
              </div>

              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/50 transition-all bg-transparent">
                <h3 className="font-semibold text-lg mb-2">
                  Filosofia
                </h3>

                <p className="text-neutral-600">
                  Cos'è davvero l'intelligenza? Le macchine possono
                  comprendere o stanno solo calcolando?
                </p>
              </div>

            </section>

            {/* COSA TROVERAI */}
            <section className="mx-auto max-w-4xl px-6 mb-20">

              <h2 className="text-2xl font-semibold text-black mb-6">
                Cosa troverai qui
              </h2>

              <div className="space-y-6 text-neutral-600 leading-relaxed">

                <p>
                  • Introduzioni semplici ai concetti fondamentali
                  dell'intelligenza artificiale.
                </p>

                <p>
                  • Approfondimenti tecnici su modelli, dataset
                  e processi di addestramento.
                </p>

                <p>
                  • Analisi dei dilemmi etici legati
                  all'automazione e alla decisione algoritmica.
                </p>

                <p>
                  • Riflessioni sul rapporto tra tecnologia,
                  conoscenza e pensiero umano.
                </p>

              </div>
            </section>

            {/* DOMANDA FINALE */}
            <section className="mx-auto max-w-3xl px-6 mb-10">

              <h2 className="text-xl font-semibold text-black mb-4">
                Una domanda aperta
              </h2>

              <p className="text-neutral-600 leading-relaxed">
                L'intelligenza artificiale sta diventando sempre più potente,
                ma comprendiamo davvero cosa significhi creare sistemi che
                apprendono e prendono decisioni?
                Questo sito è un tentativo di esplorare questa domanda.
              </p>

            </section>

          </>
        }
      />

    </div>
  );
}