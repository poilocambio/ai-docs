"use client"; // -da chatGPT- necessario per usare dynamic con ssr: false
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("@/components/NeuralBackground"), { ssr: false });

export default function NeuralBackgroundWrapper() {
  return <NeuralBackground />;
}