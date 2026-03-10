import React, { ReactNode } from "react";

type DefaultPageProps = {
  title?: string;
  content?: ReactNode;
};

// DefaultPage è trasparente — il frosted glass è gestito
// dai singoli componenti figli (ArticleSection, CardGrid, ecc.)
// così il canvas neurale rimane visibile tra una sezione e l'altra.
export default function DefaultPage({ title, content }: DefaultPageProps) {
  return (
    <div className="relative avoid-canvas">
      <div className="mx-auto max-w-3xl lg:max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">

        {/* Titolo — frosted glass localizzato solo qui */}
        {title && (
          <div className="mb-10 sm:mb-14 inline-block w-full text-center">
            <h1 className="inline-block text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black leading-tight px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-sm">
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