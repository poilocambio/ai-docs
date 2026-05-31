"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiX } from "react-icons/fi";

export default function Banner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative shrink-0 bg-banner text-on-dark">
      <div className="flex items-center justify-center gap-x-3 px-10 py-2.5 text-center text-xs sm:text-sm">
        <p className="text-on-dark/80">
          Una guida ragionata all&apos;intelligenza artificiale: dai modelli alle implicazioni etiche.
        </p>
        <Link
          href="/fondamenti"
          className="group inline-flex items-center gap-1 font-medium text-cream hover:text-on-dark transition-colors whitespace-nowrap"
        >
          Inizia
          <FiArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <button
        onClick={() => setVisible(false)}
        aria-label="Chiudi annuncio"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-on-dark/50 hover:text-on-dark hover:bg-on-dark/10 transition-colors"
      >
        <FiX size={16} />
      </button>
    </div>
  );
}
