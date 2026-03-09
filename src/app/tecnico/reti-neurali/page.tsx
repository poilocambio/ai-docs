import React from "react";
import DefaultPage from "@/components/DefaultPage";
import NeuralFormation from "@/components/NeuralFormation";

export default function RetiNeurali() {
  return (
    <main className="relative bg-white/30">

      <NeuralFormation />

      <section className="h-[150vh] flex items-center justify-center">
        <h1 className="text-5xl font-light">
          Chaos
        </h1>
      </section>

      <section className="h-[150vh] flex items-center justify-center">
        <h1 className="text-5xl font-light">
          Connections
        </h1>
      </section>

      <section className="h-[160vh] flex items-center justify-center">
        <h1 className="text-5xl font-light">
          Intelligence
        </h1>
      </section>

    </main>
  );
}