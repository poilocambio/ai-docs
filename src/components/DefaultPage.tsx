import { ReactNode } from "react";

type DefaultPageProps = {
  title?: string;
  content?: ReactNode;
  /** Immagine hero opzionale (es. "/img/etica.jpg"). Se il file manca, resta
   *  un pannello rialzato col titolo (fallback graceful, nessun errore in console). */
  image?: string;
};

export default function DefaultPage({ title, content, image }: DefaultPageProps) {
  return (
    <div className="relative avoid-canvas">
      <div className="mx-auto max-w-3xl lg:max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">

        {/* Titolo: con `image` = hero band sfumata; senza = titolo pulito centrato */}
        {title && (
          image ? (
            <section className="relative w-full overflow-hidden rounded-3xl bg-surface-raised mb-12 sm:mb-16 min-h-[260px] sm:min-h-[360px] flex items-end">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${image}')` }}
                aria-hidden="true"
              />
              {/* Velo sfumato: solido in basso (titolo leggibile) → trasparente in alto */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-surface/15" aria-hidden="true" />
              <h1 className="relative px-6 sm:px-10 py-8 sm:py-11 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink leading-tight">
                {title}
              </h1>
            </section>
          ) : (
            <div className="mb-10 sm:mb-14 w-full text-center">
              <h1 className="inline-block text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink leading-tight">
                {title}
              </h1>
            </div>
          )
        )}

        {content ? (
          <div className="space-y-12 sm:space-y-16">
            {content}
          </div>
        ) : (
          <p className="text-base text-ink-soft leading-relaxed text-center">
            Contenuto in arrivo.
          </p>
        )}

      </div>
    </div>
  );
}
