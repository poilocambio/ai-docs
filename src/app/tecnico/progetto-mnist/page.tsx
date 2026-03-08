import NeuralEvolution from "@/components/NeuralEvolution";

export default function ProgettoMNIST() {
  return (
    <main className="relative bg-white">

      <NeuralEvolution />

      <section className="h-[150vh] flex items-center justify-center">
        <h1 className="text-5xl font-light">
          Chaos
        </h1>
      </section>

      <section className="h-[150vh] flex items-center justify-center">
        <h1 className="text-5xl font-light">
          Structure
        </h1>
      </section>

      <section className="h-[150vh] flex items-center justify-center">
        <h1 className="text-5xl font-light">
          Intelligence
        </h1>
      </section>

    </main>
  );
}