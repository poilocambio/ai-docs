import type { Metadata } from "next";
import "./globals.css";
import NeuralBackgroundWrapper from "@/components/NeuralBackgroundWrapper";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Intelligenza Artificiale: Analisi Tecnica ed Etica",
    template: "%s \\ AI Docs",
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
      <body className="flex min-h-screen overflow-x-hidden bg-white">

        {/* Canvas neurale globale — dietro tutto, non interattivo */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <NeuralBackgroundWrapper />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-40" />
        </div>

        {/* Sidebar — solo desktop, sticky */}
        <Sidebar />

        {/* Colonna principale: Header + contenuto */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          {/*
            Nessun padding globale sul main.
            Ogni pagina gestisce il proprio padding internamente:
            - DefaultPage ha px-4 py-12
            - Le pagine full-screen (es. reti-neurali) non ne hanno bisogno
          */}
          <main className="flex-1">
            {children}
          </main>
        </div>

        <Analytics />
      </body>
    </html>
  );
}