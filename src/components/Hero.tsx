export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            Get Started
          </button>

          <button className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-black hover:bg-neutral-100 transition-colors">
            Explore Ethics
          </button>
        </div>

      </div>
    </section>
  );
}