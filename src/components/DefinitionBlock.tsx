import React, { ReactNode } from "react";

type Definition = {
  term: string;
  definition: string | ReactNode;
  also?: string;
};

type DefinitionBlockProps = {
  definitions: Definition[];
  title?: string;
};

export default function DefinitionBlock({ definitions, title }: DefinitionBlockProps) {
  return (
    <div className="rounded-xl border border-neutral-200/50 overflow-hidden bg-white/30 backdrop-blur-md">

      {title && (
        <div className="px-4 sm:px-5 py-3 border-b border-neutral-200/50 bg-white/20">
          <span className="text-xs tracking-widest uppercase text-neutral-400 font-medium">
            {title}
          </span>
        </div>
      )}

      <dl className="divide-y divide-neutral-100/80">
        {definitions.map((def, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:gap-8 px-4 sm:px-5 py-4 hover:bg-white/30 transition-colors duration-150"
          >
            <dt className="sm:w-44 shrink-0 mb-1.5 sm:mb-0">
              <span className="font-mono text-sm font-semibold text-black">
                {def.term}
              </span>
              {def.also && (
                <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                  alias: {def.also}
                </p>
              )}
            </dt>

            <dd className="text-sm text-neutral-600 leading-relaxed flex-1 m-0">
              {def.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}