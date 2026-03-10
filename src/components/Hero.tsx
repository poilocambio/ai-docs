import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-transparent min-h-screen flex flex-col justify-between overflow-hidden">

      {/* Grid decorativa */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Contenuto */}
      <div className="relative mx-auto max-w-4xl px-6 pt-28 text-center">

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="text-xs tracking-widest uppercase text-neutral-500 border border-neutral-200 px-3 py-1 rounded-full">
            Artificial Intelligence
          </span>
        </div>

        {/* Titolo */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black leading-tight">
          Capire l'
          <span className="text-neutral-900">Intelligenza Artificiale</span>
        </h1>

        {/* Sottotitolo */}
        <p className="mt-6 text-lg leading-relaxed text-neutral-600 max-w-2xl mx-auto">
          Un'esplorazione dell'AI tra tecnologia, filosofia ed etica.
          Dai modelli di machine learning fino alle domande più profonde
          sul rapporto tra intelligenza umana e sistemi artificiali.
        </p>

        {/* Bottoni */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <Link
            href="/tecnico"
            className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-all"
          >
            Esplora la Tecnica
          </Link>

          <Link
            href="/etica"
            className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-all"
          >
            Scopri l'Etica
          </Link>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative flex flex-col items-center mb-24 text-neutral-400"
        aria-hidden="true"
      >
        <span className="text-xs tracking-wider mb-2 uppercase">
          Scroll
        </span>

        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

    </section>
  );
}