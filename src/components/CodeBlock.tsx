"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/github.css";

// Registra solo i linguaggi necessari (bundle minimo)
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);

type SupportedLanguage = "python" | "typescript" | "javascript" | "bash";

type CodeBlockProps = {
  code: string;
  language?: SupportedLanguage;
  filename?: string;
  caption?: string;
};

export default function CodeBlock({
  code,
  language = "python",
  filename,
  caption,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  // Highlight solo quando code o language cambiano
  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    // Rimuove highlight precedente per evitare doppio processing
    el.removeAttribute("data-highlighted");
    hljs.highlightElement(el);
  }, [code, language]);

  // useCallback evita re-creazione della funzione ad ogni render
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback silenzioso — clipboard può essere bloccata in alcuni browser
    }
  }, [code]);

  return (
    <div className="rounded-xl border border-neutral-200 overflow-hidden text-sm">

      {/* Toolbar — padding aumentato su mobile per touch target */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 gap-2">

        {/* Dots + filename */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {/* Dots decorativi — solo su sm+ per non sprecare spazio */}
          <span className="hidden sm:block w-3 h-3 rounded-full bg-neutral-200 shrink-0" aria-hidden="true" />
          <span className="hidden sm:block w-3 h-3 rounded-full bg-neutral-200 shrink-0" aria-hidden="true" />
          <span className="hidden sm:block w-3 h-3 rounded-full bg-neutral-200 shrink-0" aria-hidden="true" />
          {filename && (
            <span className="text-xs text-neutral-400 font-mono truncate ml-0 sm:ml-2">
              {filename}
            </span>
          )}
        </div>

        {/* Badge linguaggio + bottone copia */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-xs tracking-widest uppercase text-neutral-400 hidden xs:block">
            {language}
          </span>

          {/* Bottone copia — min 44px touch target con padding */}
          <button
            onClick={handleCopy}
            className="text-xs text-neutral-400 hover:text-black active:text-black border border-neutral-200 px-2.5 py-1 rounded transition-colors duration-150 min-w-[48px] text-center"
            aria-label={copied ? "Copiato" : "Copia codice"}
          >
            {copied ? "✓" : "copia"}
          </button>
        </div>
      </div>

      {/* Codice — scroll orizzontale su mobile, font ridotto */}
      <pre className="overflow-x-auto p-3 sm:p-4 bg-white m-0 text-xs sm:text-sm">
        <code
          ref={codeRef}
          className={`language-${language} leading-relaxed`}
        >
          {code.trim()}
        </code>
      </pre>

      {/* Caption */}
      {caption && (
        <div className="px-3 sm:px-4 py-2 border-t border-neutral-100 bg-neutral-50/50">
          <p className="text-xs text-neutral-400 leading-relaxed">{caption}</p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------
// INSTALLAZIONE (una tantum):
//   npm install highlight.js
//
// ESEMPIO D'USO in una page.tsx:
//
// import CodeBlock from "@/components/CodeBlock";
//
// <CodeBlock
//   language="python"
//   filename="training.py"
//   caption="Esempio semplificato di training loop con PyTorch."
//   code={`
// import torch
// import torch.nn as nn
//
// model = nn.Linear(784, 10)
// optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
// criterion = nn.CrossEntropyLoss()
//
// for epoch in range(10):
//     optimizer.zero_grad()
//     output = model(x_train)
//     loss = criterion(output, y_train)
//     loss.backward()
//     optimizer.step()
//   `}
// />
// ----------------------------------------------------------------