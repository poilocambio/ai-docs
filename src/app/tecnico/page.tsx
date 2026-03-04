import React from "react";
import DefaultPage from "@/components/DefaultPage";

export default function TecnicoPage() {
  return (
    <DefaultPage
      title="Tecnico"
      content={
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-2">Machine Learning</h2>
            <p className="text-neutral-600 leading-relaxed">
              Scopri algoritmi di apprendimento automatico, dataset e applicazioni reali.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Reti Neurali</h2>
            <p className="text-neutral-600 leading-relaxed">
              Introduzione a reti neurali, perceptron, deep learning e esempi pratici.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Progetto MNIST</h2>
            <p className="text-neutral-600 leading-relaxed">
              Analisi passo passo di un progetto che riconosce cifre scritte a mano.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Tipi di IA</h2>
            <p className="text-neutral-600 leading-relaxed">
              IA ristretta, IA generale e sistemi ibridi: usi, limiti e prospettive future.
            </p>
          </section>
        </div>
      }
      localSidebar={
        <ul className="space-y-2 text-sm">
          <li className="hover:text-black cursor-pointer">Machine Learning</li>
          <li className="hover:text-black cursor-pointer">Reti Neurali</li>
          <li className="hover:text-black cursor-pointer">Progetto MNIST</li>
          <li className="hover:text-black cursor-pointer">Tipi di IA</li>
        </ul>
      }
    />
  );
}