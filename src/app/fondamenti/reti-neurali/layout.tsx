// @/app/tecnico/reti-neurali/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reti Neurali",
  description: "Reti Neurali Page AI Docs",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}