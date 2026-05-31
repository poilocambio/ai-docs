import { ReactNode } from "react";

type ArticleSectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tag?: string;
};

export default function ArticleSection({
  title,
  subtitle,
  children,
  tag,
}: ArticleSectionProps) {
  return (
    <article className="group relative border-l-2 border-line pl-4 sm:pl-6 py-2 hover:border-grass transition-colors duration-300">

      {/* Dot decorativo sul bordo sinistro */}
      <div className="hidden sm:block absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-line group-hover:bg-grass transition-colors duration-300" />

      {/* Crosshair decorativo in alto a destra — visibile sempre, più forte in hover */}
      <div className="absolute right-0 top-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <div className="relative w-6 h-6">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-ink-faint" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink-faint" />
        </div>
      </div>

      {/* Tag */}
      {tag && (
        <span className="inline-block text-xs tracking-widest uppercase text-ink-faint border border-line px-2 py-0.5 rounded-full mb-3">
          {tag}
        </span>
      )}

      {/* Titolo */}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink mb-2 leading-snug">
        {title}
      </h2>

      {/* Sottotitolo */}
      {subtitle && (
        <p className="text-base text-ink-soft mb-4 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Separatore */}
      <div className="w-10 h-px bg-line mb-5 sm:mb-6" />

      {/* Contenuto */}
      <div className="text-base text-ink-soft leading-relaxed space-y-5">
        {children}
      </div>
    </article>
  );
}
