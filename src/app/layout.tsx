import type { Metadata } from "next";
import "./globals.css";
import NeuralBackgroundWrapper from "@/components/NeuralBackgroundWrapper";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://tuodominio.it"),
  title: {
    default: "Intelligenza Artificiale: Analisi Tecnica ed Etica",
    template: "%s | AI Approfondimento",
  },
  description:
    "Studio approfondito dell'intelligenza artificiale: architetture, LLM, reti neurali, bias, impatti etici e regolamentazione.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="flex min-h-screen overflow-x-hidden relative bg-white">
        {/* -da chatGPT- Canvas globale: neutrale, pointer-events-none, z-index -10 */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <NeuralBackgroundWrapper />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-40" />
        </div>

        {/* -da chatGPT- Sidebar sticky */}
        <Sidebar />

        {/* -da chatGPT- Area principale: Header + contenuto */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
