"use client";

import React, { useState, useCallback, useEffect, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/data/docs";
import { FiChevronsLeft, FiChevronsRight, FiChevronRight } from "react-icons/fi";

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const pathname = usePathname();

  // Parte SEMPRE chiusa — l'utente la apre esplicitamente
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const calcOpenSections = useCallback((path: string) => {
    const open: Record<string, boolean> = {};
    docs.forEach(page => {
      if (!page.children) return;
      if (path.startsWith(page.href) && page.href !== "/") {
        open[page.href] = true;
      }
    });
    return open;
  }, []);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => calcOpenSections(pathname)
  );

  useEffect(() => {
    setOpenSections(prev => ({ ...prev, ...calcOpenSections(pathname) }));
  }, [pathname, calcOpenSections]);

  const toggleSection = useCallback((href: string) =>
    setOpenSections(prev => ({ ...prev, [href]: !prev[href] })), []);

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);

  const isExact = useCallback((href: string) => {
    const norm = (s: string) => s.replace(/\/+$/, "") || "/";
    return norm(pathname) === norm(href);
  }, [pathname]);

  const isSectionActive = useCallback((href: string) => {
    if (href === "/") return false;
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <aside
      className={cx(
        "hidden md:flex flex-col sticky top-0 h-screen border-r border-neutral-200 bg-white shrink-0",
        "transition-[width] duration-300 ease-in-out overflow-hidden",
        sidebarOpen ? "w-56" : "w-12"
      )}
      aria-label="Sidebar di navigazione"
    >
      {/* ── Header sidebar ─────────────────────────────────────────── */}
      <div
        className="flex items-center shrink-0 border-b border-neutral-200"
        style={{ height: "var(--header-height)" }}
      >
        {/* Testo logo — visibile solo con sidebar aperta */}
        {sidebarOpen && (
          <span className="flex-1 pl-3 text-sm font-semibold tracking-tight text-black whitespace-nowrap overflow-hidden">
            AI Docs
          </span>
        )}

        {/* Toggle — sempre visibile, sempre centrato quando chiusa */}
        <button
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Comprimi sidebar" : "Espandi sidebar"}
          className={cx(
            "shrink-0 p-2 rounded-md text-neutral-400 hover:text-black hover:bg-neutral-100 active:bg-neutral-200 transition-colors",
            sidebarOpen ? "mr-1" : "mx-auto"
          )}
        >
          {sidebarOpen
            ? <FiChevronsLeft size={16} />
            : <FiChevronsRight size={16} />
          }
        </button>
      </div>

      {/* ── Navigazione ──────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-1.5">
        <ul className="space-y-0.5">
          {docs.map((page, index) => (
            <React.Fragment key={page.href}>

              {/* Separatore — solo con sidebar aperta */}
              {index !== 0 && sidebarOpen && (
                <li aria-hidden="true" className="py-1">
                  <div className="border-t border-neutral-100 mx-1" />
                </li>
              )}

              <li>
                {page.children ? (
                  <>
                    {/* Sezione con figli */}
                    <button
                      onClick={() => {
                        if (!sidebarOpen) {
                          setSidebarOpen(true);
                          // Apre anche la sezione dopo la transizione
                          setTimeout(() => toggleSection(page.href), 310);
                          return;
                        }
                        toggleSection(page.href);
                      }}
                      aria-expanded={sidebarOpen ? (openSections[page.href] ?? false) : undefined}
                      title={!sidebarOpen ? page.title : undefined}
                      className={cx(
                        "w-full flex items-center px-2 py-2 rounded-md text-sm transition-colors",
                        sidebarOpen ? "justify-between" : "justify-center",
                        isSectionActive(page.href) && !sidebarOpen
                          ? "bg-neutral-100"
                          : "hover:bg-neutral-50",
                        isSectionActive(page.href)
                          ? "text-black font-medium"
                          : "text-neutral-500 hover:text-black"
                      )}
                    >
                      {/* Label */}
                      {sidebarOpen && (
                        <span className="truncate">{page.title}</span>
                      )}

                      {/* Icona */}
                      {sidebarOpen ? (
                        <FiChevronRight
                          size={14}
                          className={cx(
                            "shrink-0 text-neutral-400 transition-transform duration-200",
                            openSections[page.href] ? "rotate-90" : ""
                          )}
                        />
                      ) : (
                        <span className={cx(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          isSectionActive(page.href) ? "bg-black" : "bg-neutral-300"
                        )} />
                      )}
                    </button>

                    {/* Figli */}
                    {sidebarOpen && openSections[page.href] && (
                      <ul className="ml-2 mt-0.5 pl-3 border-l border-neutral-200 space-y-0.5 pb-1">

                        {/* Panoramica */}
                        <li>
                          <Link
                            href={page.href}
                            className={cx(
                              "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                              isExact(page.href)
                                ? "bg-neutral-100 text-black font-medium"
                                : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                            )}
                          >
                            <span className={cx(
                              "w-1 h-1 rounded-full shrink-0",
                              isExact(page.href) ? "bg-black" : "bg-neutral-300"
                            )} />
                            Panoramica
                          </Link>
                        </li>

                        {/* Sotto-pagine */}
                        {page.children.map(child => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cx(
                                "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                                isExact(child.href)
                                  ? "bg-neutral-100 text-black font-medium"
                                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                              )}
                            >
                              <span className={cx(
                                "w-1 h-1 rounded-full shrink-0",
                                isExact(child.href) ? "bg-black" : "bg-neutral-300"
                              )} />
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Link semplice */
                  <Link
                    href={page.href}
                    title={!sidebarOpen ? page.title : undefined}
                    className={cx(
                      "flex items-center px-2 py-2 rounded-md text-sm transition-colors",
                      sidebarOpen ? "gap-2" : "justify-center",
                      isExact(page.href)
                        ? "bg-neutral-100 text-black font-medium"
                        : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                    )}
                  >
                    <span className={cx(
                      "rounded-full shrink-0",
                      sidebarOpen ? "w-1 h-1" : "w-1.5 h-1.5",
                      isExact(page.href) ? "bg-black" : "bg-neutral-300"
                    )} />
                    {sidebarOpen && (
                      <span className="truncate">{page.title}</span>
                    )}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(Sidebar);