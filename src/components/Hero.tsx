import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-transparent min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Grid decorativa */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Contenuto principale */}
      <div className="relative mx-auto max-w-4xl px-6 pt-24 text-center">
        <h1 className="text-4xl font-bold text-black mb-4 sm:text-5xl tracking-tight">
          Benvenuto in AI Docs
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          Scopri tutto sull'intelligenza artificiale: dalle basi del machine
          learning alle reti neurali fino alle implicazioni etiche della
          tecnologia.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/tecnico"
            className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/etica"
            className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-colors"
          >
            Explore Ethics
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative flex flex-col items-center mb-28 text-neutral-400 animate-bounce">
        {[0, 1].map((i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i === 1 ? "-mt-2" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ))}
      </div>
    </section>
  );
}