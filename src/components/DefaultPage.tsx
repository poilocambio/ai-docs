import { ReactNode } from "react";

type DefaultPageProps = {
  title?: string;
  content?: ReactNode;
};

export default function DefaultPage({ title, content }: DefaultPageProps) {
  return (
    <div className="relative avoid-canvas">
      <div className="mx-auto max-w-3xl lg:max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">

        {/* Titolo — griglia decorativa + angoli crosshair */}
        {title && (
          <div className="relative mb-10 sm:mb-14 w-full text-center py-8 sm:py-10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden="true" />
            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neutral-400 pointer-events-none" aria-hidden="true" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neutral-400 pointer-events-none" aria-hidden="true" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neutral-400 pointer-events-none" aria-hidden="true" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neutral-400 pointer-events-none" aria-hidden="true" />
            <h1 className="relative inline-block text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black leading-tight px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-sm">
              {title}
            </h1>
          </div>
        )}

        {content ? (
          <div className="space-y-12 sm:space-y-16">
            {content}
          </div>
        ) : (
          <p className="text-base text-neutral-500 leading-relaxed text-center">
            Contenuto in arrivo.
          </p>
        )}

      </div>
    </div>
  );
}
