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
    <article className="group relative border-l-2 border-neutral-200 pl-4 sm:pl-6 py-2 hover:border-neutral-400 transition-colors duration-300">

      {/* Dot decorativo sul bordo sinistro */}
      <div className="hidden sm:block absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-neutral-500 transition-colors duration-300" />

      {/* Crosshair decorativo in alto a destra */}
      <div className="absolute right-0 top-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <div className="relative w-5 h-5">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-300" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-300" />
        </div>
      </div>

      {/* Tag */}
      {tag && (
        <span className="inline-block text-xs tracking-widest uppercase text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-full mb-3">
          {tag}
        </span>
      )}

      {/* Titolo */}
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black mb-1 leading-snug">
        {title}
      </h2>

      {/* Sottotitolo */}
      {subtitle && (
        <p className="text-sm text-neutral-500 mb-4 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Separatore */}
      <div className="w-10 h-px bg-neutral-200 mb-4 sm:mb-5" />

      {/* Contenuto */}
      <div className="text-sm sm:text-base text-neutral-600 leading-relaxed space-y-4">
        {children}
      </div>
    </article>
  );
}
