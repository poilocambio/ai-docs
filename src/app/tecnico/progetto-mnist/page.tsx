import React from "react";
import DefaultPage from "@/components/DefaultPage";

export default function ProgettoMNIST() {
  return (
    <DefaultPage
      title="Progetto MNIST"
      content={
        <>
          <section id="intro">
            <h2 className="text-2xl font-semibold mt-4">Introduzione al ML</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </section>
          <section id="algoritmi">
            <h2 className="text-2xl font-semibold mt-4">Algoritmi principali</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </section>
          <section id="progetti">
            <h2 className="text-2xl font-semibold mt-4">Progetti pratici</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </section>
        </>
      }
    />
  );
}