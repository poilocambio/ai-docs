import React, { ReactNode } from "react";
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

const colsMap: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.30)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

const cardHoverStyle = {
  background: "rgba(255, 255, 255, 0.50)",
};

export default function CardGrid({ cards, columns = 3 }: CardGridProps) {
  return (
    <div className={`grid grid-cols-1 ${colsMap[columns]} gap-4 sm:gap-5`}>
      {cards.map((card, i) => {
        const inner = (
          <div
            className="h-full flex flex-col p-4 sm:p-5 rounded-xl border border-neutral-200/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 group"
            style={cardStyle}
            onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, cardHoverStyle)}
            onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, cardStyle)}
          >
            {(card.icon || card.tag) && (
              <div className="flex items-center justify-between mb-3 gap-2">
                {card.icon && (
                  <span className="text-neutral-400 group-hover:text-neutral-700 transition-colors duration-200 text-lg sm:text-xl shrink-0">
                    {card.icon}
                  </span>
                )}
                {card.tag && (
                  <span className="ml-auto text-xs tracking-widest uppercase text-neutral-400 border border-neutral-200/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {card.tag}
                  </span>
                )}
              </div>
            )}

            <h3 className="font-semibold text-sm sm:text-base text-black mb-2 leading-snug">
              {card.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed flex-1">
              {card.description}
            </p>

            {card.href && (
              <div className="mt-3 text-xs text-neutral-400 group-hover:text-black flex items-center gap-1 transition-colors duration-200">
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
          <div key={i}>{inner}</div>
        );
      })}
    </div>
  );
}