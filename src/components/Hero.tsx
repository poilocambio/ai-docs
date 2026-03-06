import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-transparent min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Grid matematica */}
      <div className="absolute inset-0 opacity-45 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Rete neurale decorativa */}
      {/* <svg
        className="absolute top-24 left-10 w-72 h-72 text-neutral-300 animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="40" cy="40" r="4" />
        <circle cx="120" cy="80" r="4" />
        <circle cx="80" cy="160" r="4" />
        <circle cx="180" cy="120" r="4" />

        <line x1="40" y1="40" x2="120" y2="80" />
        <line x1="120" y1="80" x2="80" y2="160" />
        <line x1="80" y1="160" x2="180" y2="120" />
      </svg> */}
      
      {/* Contenuto */}
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
          <Link href="/tecnico">
            <button className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-all">
              Get Started
            </button>
          </Link>

          <Link href="/etica">
            <button className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-all">
              Explore Ethics
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative flex flex-col items-center mb-28 text-neutral-400 animate-bounce">
        <svg
          className="w-5 h-5"
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
        <svg
          className="w-5 h-5 -mt-2"
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
