import React from "react";

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden text-on-dark"
      style={{ marginTop: "calc(var(--header-height) * -1)" }}
    >

      {/* Sfondo scuro dedicato dell'hero — copre il canvas globale chiaro.
          Primo figlio assoluto: resta dietro a tutto il resto della sezione. */}
      <div className="absolute inset-0 bg-night" aria-hidden="true">
        {/* Immagine di sfondo opzionale — basta inserire public/img/hero.jpg.
            Se il file non esiste resta il colore bg-night (nessun errore in console). */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
        />
        {/* Velo scuro sopra l'immagine per garantire la leggibilità del testo */}
        <div className="absolute inset-0 bg-night/60" />

        {/* Glow morbidi e ampi — niente griglia netta, atmosfera diffusa */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 0%, rgba(62,125,78,0.28), transparent 62%)," +
              "radial-gradient(55% 50% at 88% 28%, rgba(197,139,153,0.16), transparent 60%)," +
              "radial-gradient(90% 70% at 50% 118%, rgba(239,230,196,0.14), transparent 58%)",
          }}
        />
        {/* Blob sfocati per dare profondità allo sfondo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-[55vh] rounded-full bg-grass/20 blur-[120px]" />
        <div className="absolute bottom-[-12%] right-[-6%] w-[48vw] h-[45vh] rounded-full bg-mauve/15 blur-[110px]" />
      </div>

      {/* Contenuto principale — centrato verticalmente */}
      <div className="relative flex-1 flex items-center justify-center px-5 sm:px-6 pt-28 pb-20 sm:pt-32 sm:pb-28">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Titolo — display monumentale */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-on-dark leading-[0.95]">
            Capire l&apos;
            <span className="text-cream">Intelligenza Artificiale</span>
          </h1>

          {/* Sottotitolo — una riga essenziale */}
          <p className="mt-7 sm:mt-9 text-base sm:text-xl leading-relaxed text-on-dark/70 max-w-2xl mx-auto">
            Tra tecnologia, filosofia ed etica: come funziona, cosa può fare
            e cosa significa per noi.
          </p>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative flex flex-col items-center pb-8 sm:pb-10 text-on-dark/50"
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
