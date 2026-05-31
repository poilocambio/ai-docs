"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
// Tema di evidenziazione: definito in globals.css (.hljs) e adattivo dark/light.

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
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    el.removeAttribute("data-highlighted");
    hljs.highlightElement(el);
  }, [code, language]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback silenzioso
    }
  }, [code]);

  return (
    <div className="block-glass rounded-xl border border-line/60 overflow-hidden text-sm">

      {/* Toolbar */}
      <div className="block-glass-header flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-line/50 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="hidden sm:block w-3 h-3 rounded-full bg-grass/70 shrink-0" aria-hidden="true" />
          <span className="hidden sm:block w-3 h-3 rounded-full bg-mauve/70 shrink-0" aria-hidden="true" />
          <span className="hidden sm:block w-3 h-3 rounded-full bg-cream shrink-0" aria-hidden="true" />
          {filename && (
            <span className="text-xs text-ink-faint font-mono truncate ml-0 sm:ml-2">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-xs tracking-widest uppercase text-ink-faint hidden sm:block">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-xs text-ink-faint hover:text-ink active:text-ink border border-line/60 px-2.5 py-1 rounded transition-colors duration-150 min-w-[48px] text-center"
            aria-label={copied ? "Copiato" : "Copia codice"}
          >
            {copied ? "✓" : "copia"}
          </button>
        </div>
      </div>

      {/* Codice */}
      <pre className="block-glass-pre overflow-x-auto p-3 sm:p-4 m-0 text-xs sm:text-sm">
        <code ref={codeRef} className={`language-${language} leading-relaxed`}>
          {code.trim()}
        </code>
      </pre>

      {/* Caption */}
      {caption && (
        <div className="block-glass-caption px-3 sm:px-4 py-2 border-t border-line/50">
          <p className="text-xs text-ink-faint leading-relaxed">{caption}</p>
        </div>
      )}
    </div>
  );
}
