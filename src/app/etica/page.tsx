import React from "react";
import DefaultPage from "@/components/DefaultPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Docs - Etica",
  description: "Etica Page AI Docs",
};

export default function EticaPage() {
  return (
    <DefaultPage
      title="Etica"
      content={
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-2">Dilemmi etici</h2>
            <p className="text-neutral-600 leading-relaxed">
              L’intelligenza artificiale non è solo una questione tecnica:
              solleva profonde questioni etiche. Chi è responsabile delle
              decisioni prese da un algoritmo? Come si evitano bias e
              discriminazioni nei modelli addestrati su dati umani? 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Limiti</h2>
            <p className="text-neutral-600 leading-relaxed">
              Qual è il
              limite accettabile dell’automazione nelle decisioni che riguardano
              la vita delle persone? Dai sistemi di sorveglianza alle decisioni
              giudiziarie automatizzate, l’AI mette in discussione concetti
              fondamentali come responsabilità, autonomia e giustizia.{" "}
            </p>
          </section>
        </div>
      }
    />
  );
}
