"use client";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(
  () => import("@/components/NeuralBackground"),
  { ssr: false },
);

export default function NeuralBackgroundWrapper() {
  return <NeuralBackground />;
}
