import React from "react";
import DefaultPage from "@/components/DefaultPage";

export default function MachineLearning() {
  return (
    <DefaultPage
      title="Machine Learning"
      content={
        <>
          <section id="intro">
            <h2 className="text-2xl font-semibold mt-4">Introduzione al ML</h2>
            <p>
              Il machine learning è il cuore operativo dell’intelligenza
              artificiale moderna. Invece di programmare esplicitamente ogni
              regola, si costruiscono modelli matematici che apprendono dai
              dati. Attraverso l’analisi di grandi quantità di esempi, questi
              sistemi individuano pattern statistici e li utilizzano per fare
              previsioni o prendere decisioni. Esistono diversi paradigmi di
              apprendimento: supervisionato, non supervisionato e per rinforzo.
              In tutti i casi il principio è lo stesso: il modello modifica i
              propri parametri per ridurre l’errore tra le sue previsioni e la
              realtà. Il machine learning non “capisce” nel senso umano del
              termine: opera su correlazioni matematiche. Tuttavia, quando i
              dati sono sufficienti e i modelli abbastanza complessi, i
              risultati possono apparire sorprendentemente intelligenti.
            </p>
          </section>
          <section id="algoritmi">
            <h2 className="text-2xl font-semibold mt-4">
              Algoritmi principali
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>
          <section id="progetti">
            <h2 className="text-2xl font-semibold mt-4">Progetti pratici</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </section>
        </>
      }
    />
  );
}
