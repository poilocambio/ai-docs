import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reti Neurali: i mattoni del deep learning",
  description: "Architettura e funzionamento delle reti neurali artificiali: neuroni, layer, pesi e il processo di apprendimento.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
