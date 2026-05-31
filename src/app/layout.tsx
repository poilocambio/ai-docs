import type { Metadata } from "next";
import "./globals.css";
import NeuralBackgroundWrapper from "@/components/NeuralBackgroundWrapper";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";

const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Intelligenza Artificiale: Analisi Tecnica ed Etica",
    template: "%s \\ AI-docs",
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
    <html lang="it" className={display.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen overflow-x-hidden bg-surface text-ink antialiased">

        {/* Tema: imposta data-theme prima del paint (default "dark") per evitare il flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();",
          }}
        />

        {/* Canvas neurale globale — dietro tutto, non interattivo */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <NeuralBackgroundWrapper />
          <div
            className="absolute inset-0 opacity-100"
            style={{
              background:
                "radial-gradient(60% 50% at 16% 10%, rgba(62,125,78,0.22), transparent 62%)," +
                "radial-gradient(55% 50% at 86% 20%, rgba(197,139,153,0.20), transparent 62%)," +
                "radial-gradient(72% 60% at 50% 102%, rgba(239,230,196,0.16), transparent 60%)",
            }}
          />
        </div>

        {/* Banner annuncio — full-width sopra tutto, scorre via con la pagina */}
        <Banner />

        {/* Header full-width (la sidebar è stata rimossa: la navigazione completa
            — incluse le sotto-pagine — vive nell'Header desktop e nel drawer mobile) */}
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

        <Analytics />
      </body>
    </html>
  );
}