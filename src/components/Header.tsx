"use client";

import { useState, useCallback, useEffect, useRef, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/data/docs";
import { FiMenu, FiX, FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { cx } from "@/lib/cx";

// Indice dell'ultima voce con figli — serve per allineare il dropdown a destra
const lastChildIndex = docs.reduce(
  (last, page, i) => (page.children ? i : last), -1
);

const Header = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // In cima a QUALSIASI pagina l'header è trasparente; appena si scrolla → glass.
  // Il listener si riaggancia a ogni cambio pagina (la navigazione resetta lo scroll a 0).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const transparentTop = !scrolled;

  // Solo l'hero della home è sempre scuro: lì il testo va forzato chiaro (su desktop,
  // dov'è davvero trasparente). Altrove i colori dell'header seguono il tema.
  const isHome = (pathname.replace(/\/+$/, "") || "/") === "/";
  const lightOverHero = isHome && transparentTop;

  // Toggle tema chiaro/scuro: persistito in localStorage, applicato su <html data-theme>.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") setTheme(t);
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  }, []);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  useEffect(() => { closeAll(); }, [pathname, closeAll]);

  // Apre subito, chiude con delay di 120ms (copre il gap tra bottone e dropdown)
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

  const toggleDropdown = useCallback((href: string) => {
    setActiveDropdown(prev => prev === href ? null : href);
  }, []);

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown(href);
    } else if (e.key === "Escape") {
      setActiveDropdown(null);
    }
  }, [toggleDropdown]);

  // Voci nav: chiare sopra l'hero scuro; altrimenti seguono il tema (ink / surface-sunken).
  const navItemCls = (active: boolean) =>
    lightOverHero
      ? active
        ? "text-on-dark font-medium bg-white/10"
        : "text-on-dark/70 hover:text-on-dark hover:bg-white/10"
      : active
        ? "text-ink font-medium bg-surface-sunken"
        : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60";

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-colors duration-300",
        transparentTop
          ? "max-md:bg-surface-raised/55 max-md:backdrop-blur-xl max-md:border-b max-md:border-line/50"
          : "bg-surface-raised/55 backdrop-blur-xl border-b border-line/50"
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="relative flex items-center justify-between h-full px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className={cx(
            "text-sm font-semibold tracking-tight transition-colors shrink-0",
            lightOverHero
              ? "text-ink hover:text-ink-soft md:text-on-dark md:hover:text-on-dark/70"
              : "text-ink hover:text-ink-soft"
          )}
        >
          AI-docs
        </Link>

        {/* ── Nav desktop — pill traslucida centrata ───────────────── */}
        <nav
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 rounded-full px-1.5 py-1 nav-glass border border-white/10"
          aria-label="Navigazione principale"
        >
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
                    onClick={() => toggleDropdown(page.href)}
                    onKeyDown={(e) => handleDropdownKeyDown(e, page.href)}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === page.href}
                    className={cx(
                      "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors",
                      navItemCls(isSectionActive(page.href))
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
                        "absolute top-full mt-0 w-52 z-50",
                        pageIndex === lastChildIndex ? "right-0" : "left-0"
                      )}
                      onMouseEnter={() => handleMouseEnter(page.href)}
                      onMouseLeave={() => handleMouseLeave()}
                    >
                      {/* Ponte invisibile che copre il gap di mt-1 */}
                      <div className="h-2 w-full" />

                      <div className="bg-surface-raised border border-line rounded-lg shadow-lg overflow-hidden py-1">
                        <Link
                          href={page.href}
                          className={cx(
                            "block px-4 py-2 text-sm transition-colors",
                            isExact(page.href)
                              ? "text-ink font-medium bg-surface-sunken/60"
                              : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
                          )}
                        >
                          Panoramica
                        </Link>

                        <div className="my-1 mx-3 border-t border-line/60" />

                        {page.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cx(
                              "block px-4 py-2 text-sm transition-colors",
                              isExact(child.href)
                                ? "text-ink font-medium bg-surface-sunken/60"
                                : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
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
                    "block px-3 py-1.5 rounded-full text-sm transition-colors",
                    navItemCls(isExact(page.href))
                  )}
                >
                  {page.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* ── Cluster destro: toggle tema + CTA + hamburger ──────────── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Toggle chiaro/scuro — visibile su tutti i dispositivi */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"}
            title={theme === "dark" ? "Tema chiaro" : "Tema scuro"}
            className={cx(
              "p-2 rounded-full transition-colors",
              lightOverHero
                ? "text-ink hover:bg-surface-sunken/60 md:text-on-dark md:hover:bg-white/10"
                : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
            )}
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* CTA "Inizia" — pill, solo desktop. Chiara sopra l'hero; altrimenti segue il tema */}
          <Link
            href="/fondamenti"
            className={cx(
              "hidden md:inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              lightOverHero
                ? "bg-on-dark text-night hover:bg-on-dark/85"
                : "bg-ink text-surface hover:bg-ink/85"
            )}
          >
            Inizia
          </Link>

          {/* Hamburger mobile (l'header su mobile è sempre glass → colori dal tema) */}
          <button
            className="md:hidden p-2 -mr-1 rounded-md text-ink-soft hover:text-ink hover:bg-surface-sunken transition-colors"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(p => !p)}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Drawer mobile ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden absolute inset-x-0 top-full bg-surface-raised border-t border-line shadow-lg z-40 max-h-[calc(100dvh-var(--header-height,64px))] overflow-y-auto"
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
                          ? "text-ink font-medium"
                          : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
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
                      <ul className="ml-3 pl-3 border-l border-line/60 space-y-0.5 mb-1">
                        <li>
                          <Link
                            href={page.href}
                            onClick={closeAll}
                            className={cx(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              isExact(page.href)
                                ? "text-ink font-medium bg-surface-sunken"
                                : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
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
                                  ? "text-ink font-medium bg-surface-sunken"
                                  : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
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
                        ? "text-ink font-medium bg-surface-sunken"
                        : "text-ink-soft hover:text-ink hover:bg-surface-sunken/60"
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
