import React from "react";

type CompareRow = {
  aspect: string;
  values: string[];
};

type CompareTableProps = {
  columns: string[];
  rows: CompareRow[];
  title?: string;
  caption?: string;
};

export default function CompareTable({ columns, rows, title, caption }: CompareTableProps) {
  return (
    <div className="block-glass rounded-2xl border border-line/60 overflow-hidden">

      {title && (
        <div className="block-glass-header px-4 sm:px-5 py-3 border-b border-line/50">
          <span className="text-xs tracking-widest uppercase text-ink-faint font-medium">
            {title}
          </span>
        </div>
      )}

      {/* Mobile: card per colonna */}
      <div className="sm:hidden divide-y divide-line/50">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="px-4 py-4">
            <p className="text-xs font-semibold text-ink tracking-tight mb-3 uppercase">
              {col}
            </p>
            <dl className="space-y-2.5">
              {rows.map((row, rowIdx) => (
                <div key={rowIdx}>
                  <dt className="text-xs font-medium text-ink-faint mb-0.5">
                    {row.aspect}
                  </dt>
                  <dd className="text-sm text-ink-soft leading-relaxed m-0">
                    {row.values[colIdx] ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: tabella */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="block-glass-header border-b border-line/50">
              <th className="text-left px-4 sm:px-5 py-3 text-xs font-medium text-ink-faint w-36 sm:w-44" />
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left px-4 sm:px-5 py-3.5 text-sm font-semibold text-ink tracking-tight"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-line/50">
            {rows.map((row, i) => (
              <tr key={i} className="block-glass-row transition-colors duration-150">
                <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-xs font-medium text-ink-faint align-top whitespace-nowrap">
                  {row.aspect}
                </td>
                {row.values.map((val, j) => (
                  <td
                    key={j}
                    className="px-4 sm:px-5 py-3.5 sm:py-4 text-ink-soft leading-relaxed align-top text-sm"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <div className="block-glass-caption px-4 sm:px-5 py-3 border-t border-line/50">
          <p className="text-xs text-ink-faint">{caption}</p>
        </div>
      )}
    </div>
  );
}
