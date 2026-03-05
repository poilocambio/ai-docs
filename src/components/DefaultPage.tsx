import React, { ReactNode } from "react";

type DefaultPageProps = {
  title?: string;
  content?: ReactNode;
  localSidebar?: ReactNode;
};

export default function DefaultPage({ title, content, localSidebar }: DefaultPageProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar opzionale */}
      {localSidebar && (
        <aside className="w-64 border-r border-neutral-200 p-6">
          {localSidebar}
        </aside>
      )}

      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl text-center mb-10">
            {title ?? "Pagina"}
          </h1>

          {content ? (
            <div className="space-y-16">{content}</div>
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}