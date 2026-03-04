import type { Metadata } from "next";
import "./globals.css";
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
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Area principale: Header + contenuto */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}