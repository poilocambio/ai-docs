import React from "react";
import DefaultPage from "@/components/DefaultPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Docs - Etica",
  description:
    "Etica Page AI Docs",
};


export default function EticaPage() {
  return (
    <DefaultPage
      title="Etica"
      content={
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-2">Etica 1</h2>
            <p className="text-neutral-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, deserunt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Etica 2</h2>
            <p className="text-neutral-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, repellendus.
            </p>
          </section>

        </div>
      }
    />
  );
}