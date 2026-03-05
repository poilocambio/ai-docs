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
    <div className="flex flex-col
    
    
    
    
    text-center">
      {/* Hero come prima sezione */}
      <Hero />

      {/* Sezione contenuti principali */}
      <DefaultPage
        title="Di cosa parlerà questo sito"
        content={
          <>
            {/* Introduzione */}
            <section className="mx-auto max-w-4xl px-6">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Dai tecnicismi ai dilemmi etici
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Questo sito esplora l'intelligenza artificiale a 360°, dai concetti tecnici 
                come Machine Learning e Reti Neurali, fino ai dilemmi etici e futuri. 
                Qui puoi scoprire sia come funziona la tecnologia sia come impatta sulla società.
              </p>
            </section>

            {/* Sezioni principali */}
            <section className="grid md:grid-cols-3 gap-8 mx-auto max-w-6xl px-6">
              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Tecnico</h3>
                <p className="text-neutral-600">Scopri machine learning, reti neurali e progetti reali come MNIST.</p>
              </div>
              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Etico</h3>
                <p className="text-neutral-600">Approfondisci dilemmi etici, impatto sociale e futuro dell’IA.</p>
              </div>
              <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Risorse</h3>
                <p className="text-neutral-600">Tutorial, guide, esempi di codice e articoli scientifici aggiornati.</p>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}