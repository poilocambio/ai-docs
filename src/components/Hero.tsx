import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-transparent">

      {/* Grid decorativa — unica, gestita qui */}
      <div className="absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full bg-[linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:40px_40px]" />
      </div>

      {/* Contenuto principale — centrato verticalmente */}
      <div className="relative flex-1 flex items-center justify-center px-5 sm:px-6 py-20 sm:py-28">
        <div className="w-full max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="mb-5 sm:mb-6 flex justify-center">
            <span className="text-xs tracking-widest uppercase text-neutral-400 border border-neutral-200 px-3 py-1 rounded-full">
              Artificial Intelligence
            </span>
          </div>

          {/* Titolo — scala progressivamente */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black leading-tight">
            Capire l'Intelligenza
            <br className="hidden sm:block" />
            <span className="text-neutral-500"> Artificiale</span>
          </h1>

          {/* Sottotitolo */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-neutral-500 max-w-xl mx-auto">
            Un'esplorazione dell'AI tra tecnologia, filosofia ed etica —
            dai modelli di machine learning alle domande più profonde
            sul pensiero artificiale.
          </p>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/tecnico"
              className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 active:bg-neutral-900 transition-colors"
            >
              Esplora la Tecnica
            </Link>
            <Link
              href="/etica"
              className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
            >
              Scopri l'Etica
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative flex flex-col items-center pb-8 sm:pb-10 text-neutral-400"
        aria-hidden="true"
      >
        <span className="text-xs tracking-wider mb-2 uppercase">Scroll</span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  );
}