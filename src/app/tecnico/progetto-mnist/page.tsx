import React from "react";
import DefaultPage from "@/components/DefaultPage";

export default function ProgettoMNIST() {
  return (
    <DefaultPage
      title="Progetto MNIST"
      content={
        <>
          <section id="introduzione">
            <h2 className="text-2xl font-semibold mt-4">Introduzione</h2>
            <p>
              Questo progetto mostra come creare una IA che riconosce cifre scritte a mano (dataset MNIST). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </section>
          <section id="architettura">
            <h2 className="text-2xl font-semibold mt-4">Architettura</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Descrizione della rete neurale utilizzata, layers e algoritmo di training.
            </p>
          </section>
          <section id="risultati">
            <h2 className="text-2xl font-semibold mt-4">Risultati</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accuracy e osservazioni sui test effettuati.
            </p>
          </section>
        </>
      }
    />
  );
}