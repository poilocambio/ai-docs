"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import ArticleSection from "@/components/ArticleSection";
import DefinitionBlock from "@/components/DefinitionBlock";

const NeuralFormation = dynamic(() => import("@/components/NeuralFormation"), {
  ssr: false,
});

export default function RetiNeurali() {
  const [animDone, setAnimDone]     = useState(false);
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAnimComplete = useCallback(() => {
    setAnimDone(true);
  }, []);

  const handleContinue = useCallback(() => {
    setShowContent(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  return (
    <div>

      {/* ── INTRO: occupa tutto lo spazio disponibile sotto l'header ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "calc(100dvh - var(--header-height, 64px))" }}
        aria-label="Animazione introduttiva rete neurale"
      >
        <NeuralFormation onComplete={handleAnimComplete} />

        {/* Label top-left */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none select-none">
          <p className="text-xs tracking-widest uppercase text-neutral-400">
            Reti Neurali
          </p>
        </div>

        {/* Bottone Esplora — appare dopo l'animazione */}
        <div
          className={`
            absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10
            transition-all duration-500 ease-out
            ${animDone
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"}
          `}
        >
          <button
            onClick={handleContinue}
            className="group flex flex-col items-center gap-2 px-4 py-2 text-neutral-500 hover:text-black active:text-black transition-colors"
            aria-label="Vai al contenuto"
          >
            <span className="text-xs tracking-widest uppercase font-medium">
              Esplora
            </span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── CONTENUTO ─────────────────────────────────────────────────── */}
      {showContent && (
        <div
          ref={contentRef}
          className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20 space-y-14 sm:space-y-16"
        >
          <ArticleSection
            tag="Introduzione"
            title="Cos'è una rete neurale"
            subtitle="Un sistema matematico ispirato, lontanamente, al funzionamento del cervello biologico."
          >
            <p>
              Una rete neurale artificiale è un modello computazionale composto
              da unità elementari — i <strong>neuroni artificiali</strong> —
              organizzate in strati e collegate da pesi numerici.
              Ogni connessione ha un valore che determina quanto un segnale
              viene amplificato o attenuato nel passaggio da un nodo all&apos;altro.
            </p>
            <p>
              L&apos;analogia con il cervello biologico è utile come metafora
              introduttiva, ma va presa con cautela: le reti neurali artificiali
              non replicano il funzionamento neuronale reale, sono modelli
              matematici che si ispirano vagamente alla sua struttura.
            </p>
          </ArticleSection>

          <DefinitionBlock
            title="Componenti fondamentali"
            definitions={[
              {
                term: "Neurone",
                definition:
                  "Unità computazionale base. Riceve uno o più input numerici, li combina con i pesi, applica una funzione di attivazione e produce un output.",
                also: "nodo, unità",
              },
              {
                term: "Peso",
                definition:
                  "Valore numerico associato a ogni connessione. Determina l'importanza di un input. Durante il training i pesi vengono aggiornati per ridurre l'errore.",
                also: "weight, parametro",
              },
              {
                term: "Bias",
                definition:
                  "Termine aggiuntivo sommato agli input pesati. Permette al neurone di attivarsi anche quando tutti gli input sono zero, aggiungendo flessibilità al modello.",
              },
              {
                term: "Funzione di attivazione",
                definition:
                  "Funzione applicata all'output del neurone per introdurre non-linearità. Senza di essa una rete profonda si comporterebbe come un semplice modello lineare. Esempi: ReLU, Sigmoid, Tanh.",
              },
              {
                term: "Layer",
                definition:
                  "Strato di neuroni. Ogni rete ha almeno un input layer e un output layer. I layer nascosti intermedi danno il nome al Deep Learning.",
                also: "strato",
              },
            ]}
          />

          <ArticleSection
            tag="Struttura"
            title="Come è organizzata una rete"
            subtitle="Input, layer nascosti, output — e perché la profondità conta."
          >
            <p>
              I neuroni sono organizzati in <strong>layer sequenziali</strong>.
              Il primo layer riceve i dati grezzi: pixel, numeri, token.
              Gli hidden layer li trasformano in rappresentazioni sempre più
              astratte. L&apos;output layer produce la risposta finale: una classe,
              un numero, una distribuzione di probabilità.
            </p>
            <p>
              L&apos;animazione nell&apos;intro mostra esattamente questa struttura:
              punti casuali che convergono in layer ordinati, connessi tra loro.
              Ogni colonna è un layer, ogni linea una connessione pesata.
            </p>
            <p>
              La profondità — il numero di hidden layer — è ciò che distingue
              le reti &quot;deep&quot; da quelle superficiali. Reti più profonde
              apprendono pattern più complessi, ma richiedono più dati,
              più computazione e tecniche di training più sofisticate.
            </p>
          </ArticleSection>

          <ArticleSection
            tag="Prossimo"
            title="Come si allena una rete"
            subtitle="Backpropagation, gradient descent e loss function — nella sezione Training."
          >
            <p>
              Una rete non nasce con i pesi giusti: li <em>impara</em>.
              Il training consiste nel mostrare migliaia di esempi alla rete,
              misurare quanto sbaglia con una funzione di loss, e aggiornare
              i pesi nella direzione che riduce l&apos;errore. Questo processo
              si chiama <strong>backpropagation</strong> ed è il cuore
              del Deep Learning moderno.
            </p>
          </ArticleSection>
        </div>
      )}
    </div>
  );
}
