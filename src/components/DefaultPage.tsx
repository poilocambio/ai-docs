import React, { ReactNode } from "react";

type DefaultPageProps = {
  title?: string;
  content?: ReactNode;
  localSidebar?: ReactNode;
};

export default function DefaultPage({ title, content }: DefaultPageProps) {
  return (
    <div className="relative flex flex-col md:flex-row bg-transparent overflow-hidden">
      {/* Grid decorativa */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="w-full h-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px]"
        />
      </div>

      {/* 
        -da chatGPT-
        Abbiamo aggiunto la classe "avoid-canvas" sul main content.
        Il canvas neurale leggerà questa area tramite querySelector
        e impedirà ai nodi di entrare in questa zona.
        In questo modo tutto il contenuto delle pagine resta leggibile
        senza dover aggiungere la classe manualmente in ogni pagina.
      */}
      <main className="relative flex-1 avoid-canvas">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl text-center mb-12">
            {title ?? "Pagina"}
          </h1>

          {content ? (
            <div className="space-y-16">{content}</div>
          ) : (
            <p className="text-lg leading-relaxed text-neutral-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}