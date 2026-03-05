import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex flex-col justify-between">
      {/* Contenuto principale in alto */}
      <div className="mx-auto max-w-4xl px-6 pt-24 text-center">
        <h1 className="text-4xl font-bold text-black mb-4 sm:text-5xl">
          Benvenuto in AI Docs
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          Scopri tutto sull'intelligenza artificiale, dai concetti tecnici
          ai dilemmi etici e futuri. Qui puoi esplorare machine learning,
          reti neurali e molto altro.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/tecnico">
            <button className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
              Get Started
            </button>
          </Link>
          <Link href="/etica">
            <button className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-colors">
              Explore Ethics
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator in basso */}
      <div className="flex flex-col items-center mb-28 text-neutral-500 animate-bounce">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <svg
          className="w-5 h-5 -mt-2"
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