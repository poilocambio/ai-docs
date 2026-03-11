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
    <div className="block-glass rounded-xl border border-neutral-200/50 overflow-hidden">

      {title && (
        <div className="block-glass-header px-4 sm:px-5 py-3 border-b border-neutral-200/40">
          <span className="text-xs tracking-widest uppercase text-neutral-400 font-medium">
            {title}
          </span>
        </div>
      )}

      {/* Mobile: card per colonna */}
      <div className="sm:hidden divide-y divide-neutral-100/60">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="px-4 py-4">
            <p className="text-xs font-semibold text-black tracking-tight mb-3 uppercase">
              {col}
            </p>
            <dl className="space-y-2.5">
              {rows.map((row, rowIdx) => (
                <div key={rowIdx}>
                  <dt className="text-xs font-medium text-neutral-400 mb-0.5">
                    {row.aspect}
                  </dt>
                  <dd className="text-sm text-neutral-600 leading-relaxed m-0">
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
            <tr className="block-glass-header border-b border-neutral-200/40">
              <th className="text-left px-4 sm:px-5 py-3 text-xs font-medium text-neutral-400 w-36 sm:w-44" />
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-black tracking-tight"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100/60">
            {rows.map((row, i) => (
              <tr key={i} className="block-glass-row transition-colors duration-150">
                <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-xs font-medium text-neutral-500 align-top whitespace-nowrap">
                  {row.aspect}
                </td>
                {row.values.map((val, j) => (
                  <td
                    key={j}
                    className="px-4 sm:px-5 py-3 sm:py-3.5 text-neutral-600 leading-relaxed align-top text-xs sm:text-sm"
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
        <div className="block-glass-caption px-4 sm:px-5 py-3 border-t border-neutral-100/40">
          <p className="text-xs text-neutral-400">{caption}</p>
        </div>
      )}
    </div>
  );
}