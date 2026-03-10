import React, { ReactNode } from "react";

type ArticleSectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tag?: string;
};

// Componente server: nessun "use client", nessun hook, zero JS sul client.
export default function ArticleSection({
  title,
  subtitle,
  children,
  tag,
}: ArticleSectionProps) {
  return (
    <article className="group relative border-l-2 border-neutral-200 pl-4 sm:pl-6 py-2 hover:border-neutral-400 transition-colors duration-300">

      {/* Dot decorativo — nascosto su schermi molto piccoli per semplicità */}
      <div className="hidden sm:block absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-neutral-500 transition-colors duration-300" />

      {/* Tag */}
      {tag && (
        <span className="inline-block text-xs tracking-widest uppercase text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-full mb-3">
          {tag}
        </span>
      )}

      {/* Titolo — scala da mobile a desktop */}
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-1 leading-snug">
        {title}
      </h2>

      {/* Sottotitolo */}
      {subtitle && (
        <p className="text-sm text-neutral-500 mb-4 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Separatore */}
      <div className="w-10 h-px bg-neutral-200 mb-4 sm:mb-5" />

      {/* Contenuto — testo leggermente più piccolo su mobile per leggibilità */}
      <div className="text-sm sm:text-base text-neutral-600 leading-relaxed space-y-4">
        {children}
      </div>
    </article>
  );
}

// ----------------------------------------------------------------
// ESEMPIO D'USO in una page.tsx:
//
// import ArticleSection from "@/components/ArticleSection";
//
// <ArticleSection
//   tag="Fondamenti"
//   title="Cos'è il Machine Learning"
//   subtitle="Un sottoinsieme dell'AI che apprende dai dati senza essere esplicitamente programmato."
// >
//   <p>
//     Il Machine Learning è una disciplina che permette ai computer di
//     apprendere automaticamente dall'esperienza...
//   </p>
//   <p>
//     A differenza della programmazione tradizionale, dove le regole
//     vengono scritte a mano...
//   </p>
// </ArticleSection>
// ----------------------------------------------------------------