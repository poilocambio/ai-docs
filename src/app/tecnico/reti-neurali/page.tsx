import React from "react";
import NeuralFormation from "@/components/NeuralFormation";

export default function RetiNeurali() {
  return (
    <main className="relative bg-transparent">
      <NeuralFormation />

      {/*
        Mobile: segnaposto che occupa la striscia animazione fissa (45vh).
        Spinge il contenuto testuale sotto l'animazione.
        Desktop: non esiste (il canvas copre l'intera finestra a destra).
      */}
      <div className="h-[45vh] md:hidden" aria-hidden="true" />

      <div className="flex">
        {/* Colonna testo */}
        <div className="w-full md:w-1/2 relative z-10 bg-transparent">

          {/* HERO */}
          <section className="min-h-[80vh] md:min-h-screen flex flex-col justify-center px-8 md:px-16 py-20 md:py-32">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Reti Neurali
            </h1>
            <p className="max-w-xl text-neutral-700 leading-relaxed text-sm md:text-base">
              Una rete neurale è un sistema matematico composto da nodi collegati tra loro...
            </p>
          </section>

          {/* CHAOS */}
          <section className="min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center px-8 md:px-16 py-20 md:py-32">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Chaos</h2>
            <p className="max-w-lg text-neutral-700 leading-relaxed text-sm md:text-base">
              All'inizio ci sono solo dati: numeri, immagini, parole...
            </p>
          </section>

          {/* CONNECTIONS */}
          <section className="min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center px-8 md:px-16 py-20 md:py-32">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Connections</h2>
            <p className="max-w-lg text-neutral-700 leading-relaxed text-sm md:text-base">
              I neuroni artificiali iniziano a collegarsi tra loro...
            </p>
          </section>

          {/* LEARNING */}
          <section className="min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center px-8 md:px-16 py-20 md:py-32">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Learning</h2>
            <p className="max-w-lg text-neutral-700 leading-relaxed text-sm md:text-base">
              Durante l'addestramento la rete modifica i pesi...
            </p>
          </section>

          {/* INTELLIGENCE */}
          <section className="min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center px-8 md:px-16 py-20 md:py-32">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Intelligence</h2>
            <p className="max-w-lg text-neutral-700 leading-relaxed text-sm md:text-base">
              Quando la rete è addestrata, l'informazione attraversa i livelli...
            </p>
          </section>

        </div>

        {/* Desktop: spazio visivo occupato dal canvas fisso a destra */}
        <div className="hidden md:block md:w-1/2" aria-hidden="true" />
      </div>
    </main>
  );
}
