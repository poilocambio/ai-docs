import React from "react";
import DefaultPage from "@/components/DefaultPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tipi AI",
  description: "Tipi AI Page AI Docs",
};

export default function TipiAI() {
  return (
    <DefaultPage
      title="Tipi di AI"
      content={
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-2">Tipi di AI</h2>
            <p className="text-neutral-600 leading-relaxed">
              L’intelligenza artificiale può essere classificata in diversi
              modi. Una distinzione fondamentale è tra AI ristretta (Narrow AI)
              e AI generale (AGI). La prima è progettata per compiti specifici:
              riconoscere immagini, tradurre testi, guidare veicoli. La seconda,
              ancora teorica, sarebbe capace di apprendere e ragionare in
              qualsiasi dominio cognitivo. Un’altra distinzione riguarda il
              funzionamento: sistemi simbolici basati su regole logiche sistemi
              statistici basati su dati approcci ibridi che combinano entrambi
              L’AI moderna è dominata dai metodi statistici, ma il dibattito su
              quale approccio porterà a forme di intelligenza più avanzate è
              ancora aperto.{" "}
            </p>
          </section>
        </div>
      }
    />
  );
}
