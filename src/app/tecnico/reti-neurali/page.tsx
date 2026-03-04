import React from "react";
import DefaultPage from "@/components/DefaultPage";

export default function RetiNeurali() {
  return (
    <DefaultPage
      title="Reti Neurali"
      content={
        <>
          <section id="concetti-base">
            <h2 className="text-2xl font-semibold mt-4">Concetti Base</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>
          <section id="tipi-reti">
            <h2 className="text-2xl font-semibold mt-4">Tipi di Reti Neurali</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>
          <section id="applicazioni">
            <h2 className="text-2xl font-semibold mt-4">Applicazioni Pratiche</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>
        </>
      }
    />
  );
}