import React from "react";
import DefaultPage from "@/components/DefaultPage";

export default function TipiIA() {
  return (
    <DefaultPage
      title="Tipi di IA"
      content={
        <>
          <section id="IA-debole">
            <h2 className="text-2xl font-semibold mt-4">IA Debole</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sistemi specializzati in compiti specifici.
            </p>
          </section>
          <section id="IA-forte">
            <h2 className="text-2xl font-semibold mt-4">IA Forte</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sistemi in grado di ragionare e apprendere come un umano.
            </p>
          </section>
          <section id="IA-generale">
            <h2 className="text-2xl font-semibold mt-4">IA Generale</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Concetto teorico di intelligenza artificiale universale.
            </p>
          </section>
        </>
      }
    />
  );
}