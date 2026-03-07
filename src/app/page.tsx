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
        title="Di cosa parlerà questo sito"
        content={
          <>
            <section className="mx-auto max-w-4xl px-6">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Dai tecnicismi ai dilemmi etici
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Questo sito esplora l'intelligenza artificiale a 360°,
                dai concetti tecnici come Machine Learning e Reti Neurali
                fino ai dilemmi etici e alle implicazioni sociali future.
              </p>
            </section>

            <section className="grid md:grid-cols-3 gap-8 mx-auto max-w-6xl px-6">

              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/50 transition-all bg-transparent">
                <h3 className="font-semibold text-lg mb-2">Tecnico</h3>
                <p className="text-neutral-600">
                  Machine learning, deep learning, neuroni artificiali
                  e progetti pratici.
                </p>
              </div>

              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/50 transition-all bg-transparent">
                <h3 className="font-semibold text-lg mb-2">Etico</h3>
                <p className="text-neutral-600">
                  Bias algoritmico, impatto sociale e questioni morali
                  legate all’AI.
                </p>
              </div>

              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-xl hover:-translate-y-1 hover:bg-white/50 transition-all bg-transparent">
                <h3 className="font-semibold text-lg mb-2">Risorse</h3>
                <p className="text-neutral-600">
                  Guide, articoli scientifici e tutorial aggiornati.
                </p>
              </div>

            </section>
          </>
        }
      />

    </div>
  );
}