import { ReactNode } from "react";
import Link from "next/link";

type Card = {
  title: string;
  description: string;
  icon?: ReactNode;
  tag?: string;
  href?: string;
};

type CardGridProps = {
  cards: Card[];
  columns?: 2 | 3 | 4;
};

const colsMap: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function CardGrid({ cards, columns = 3 }: CardGridProps) {
  return (
    <div className={`grid grid-cols-1 ${colsMap[columns]} gap-5`}>
      {cards.map((card, i) => {
        const isDisabled = !card.href;

        const inner = (
          <div className={`card-glass h-full flex flex-col p-5 sm:p-6 rounded-2xl border border-line/60 hover:border-grass/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group ${isDisabled ? "opacity-60 cursor-default" : ""}`}>

            {(card.icon || card.tag) && (
              <div className="flex items-center justify-between mb-3 gap-2">
                {card.icon && (
                  <span className="text-ink-faint group-hover:text-grass transition-colors duration-200 text-lg sm:text-xl shrink-0">
                    {card.icon}
                  </span>
                )}
                {card.tag && (
                  <span className="ml-auto text-xs tracking-widest uppercase text-ink-faint border border-line/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {card.tag}
                  </span>
                )}
              </div>
            )}

            <h3 className="font-semibold text-base text-ink mb-2 leading-snug">
              {card.title}
            </h3>

            <p className="text-sm text-ink-soft leading-relaxed flex-1">
              {card.description}
            </p>

            {card.href && (
              <div className="mt-3 text-xs text-ink-faint group-hover:text-ink flex items-center gap-1 transition-colors duration-200">
                <span>Leggi</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
              </div>
            )}
          </div>
        );

        return card.href ? (
          <Link key={i} href={card.href} className="block no-underline" prefetch={false}>
            {inner}
          </Link>
        ) : (
          <div key={i} aria-disabled="true">{inner}</div>
        );
      })}
    </div>
  );
}
