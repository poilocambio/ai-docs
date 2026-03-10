"use client";

import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/data/docs";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Indice dell'ultima voce con figli — serve per allineare il dropdown a destra
const lastChildIndex = docs.reduce(
  (last, page, i) => (page.children ? i : last), -1
);

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  // Dropdown desktop: quale voce è aperta
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Ref per il timeout del close delay
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  useEffect(() => { closeAll(); }, [pathname, closeAll]);

  // Apre subito, chiude con delay di 120ms
  // Il delay copre il gap tra bottone e dropdown
  const handleMouseEnter = useCallback((href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(href);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isExact = useCallback((href: string) => {
    const norm = (s: string) => s.replace(/\/+$/, "") || "/";
    return norm(pathname) === norm(href);
  }, [pathname]);

  const isSectionActive = useCallback((href: string) => {
    if (href === "/") return false;
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200"
      style={{ height: "var(--header-height)" }}
    >
      <div className="flex items-center justify-between h-full px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-black hover:text-neutral-500 transition-colors shrink-0"
        >
          AI Docs
        </Link>

        {/* ── Nav desktop ──────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigazione principale">
          {docs.map((page, pageIndex) => (
            <div
              key={page.href}
              className="relative"
              onMouseEnter={() => page.children && handleMouseEnter(page.href)}
              onMouseLeave={() => page.children && handleMouseLeave()}
            >
              {page.children ? (
                <>
                  {/* Bottone voce con figli */}
                  <button
                    className={cx(
                      "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors",
                      isSectionActive(page.href)
                        ? "text-black font-medium bg-neutral-100"
                        : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                    )}
                  >
                    {page.title}
                    <FiChevronDown
                      size={12}
                      className={cx(
                        "mt-px transition-transform duration-200",
                        activeDropdown === page.href ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {/* Dropdown — allineato a destra se è l'ultima voce con figli */}
                  {activeDropdown === page.href && (
                    <div
                      className={cx(
                        "absolute top-full mt-0 w-44 z-50",
                        pageIndex === lastChildIndex ? "right-0" : "left-0"
                      )}
                      // Il bridge copre il gap tra bottone e card
                      // impedendo che il mouse "esca" dal gruppo
                      onMouseEnter={() => handleMouseEnter(page.href)}
                      onMouseLeave={() => handleMouseLeave()}
                    >
                      {/* Ponte invisibile che copre il gap di mt-1 */}
                      <div className="h-2 w-full" />

                      <div className="bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden py-1">
                        <Link
                          href={page.href}
                          className={cx(
                            "block px-4 py-2 text-sm transition-colors",
                            isExact(page.href)
                              ? "text-black font-medium bg-neutral-50"
                              : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                          )}
                        >
                          Panoramica
                        </Link>

                        <div className="my-1 mx-3 border-t border-neutral-100" />

                        {page.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cx(
                              "block px-4 py-2 text-sm transition-colors",
                              isExact(child.href)
                                ? "text-black font-medium bg-neutral-50"
                                : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                            )}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={page.href}
                  className={cx(
                    "block px-3 py-1.5 rounded-md text-sm transition-colors",
                    isExact(page.href)
                      ? "text-black font-medium bg-neutral-100"
                      : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                  )}
                >
                  {page.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* ── Hamburger mobile ─────────────────────────────────────── */}
        <button
          className="md:hidden p-2 -mr-1 rounded-md text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(p => !p)}
        >
          {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* ── Drawer mobile ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden absolute inset-x-0 top-full bg-white border-t border-neutral-200 shadow-lg z-40 max-h-[calc(100dvh-var(--header-height,64px))] overflow-y-auto"
          aria-label="Menu mobile"
        >
          <ul className="px-3 py-2 space-y-0.5">
            {docs.map(page => (
              <li key={page.href}>
                {page.children ? (
                  <>
                    <button
                      onClick={() => setMobileSection(p => p === page.href ? null : page.href)}
                      aria-expanded={mobileSection === page.href}
                      className={cx(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors",
                        isSectionActive(page.href)
                          ? "text-black font-medium"
                          : "text-neutral-600 hover:text-black hover:bg-neutral-50"
                      )}
                    >
                      <span>{page.title}</span>
                      <FiChevronDown
                        size={14}
                        className={cx(
                          "transition-transform duration-200",
                          mobileSection === page.href ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {mobileSection === page.href && (
                      <ul className="ml-3 pl-3 border-l border-neutral-100 space-y-0.5 mb-1">
                        <li>
                          <Link
                            href={page.href}
                            onClick={closeAll}
                            className={cx(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              isExact(page.href)
                                ? "text-black font-medium bg-neutral-100"
                                : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                            )}
                          >
                            Panoramica
                          </Link>
                        </li>
                        {page.children.map(child => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className={cx(
                                "block px-3 py-2 rounded-md text-sm transition-colors",
                                isExact(child.href)
                                  ? "text-black font-medium bg-neutral-100"
                                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={page.href}
                    onClick={closeAll}
                    className={cx(
                      "block px-3 py-2.5 rounded-md text-sm transition-colors",
                      isExact(page.href)
                        ? "text-black font-medium bg-neutral-100"
                        : "text-neutral-600 hover:text-black hover:bg-neutral-50"
                    )}
                  >
                    {page.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default memo(Header);