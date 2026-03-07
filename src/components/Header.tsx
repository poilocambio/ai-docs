"use client";
import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { docs } from "@/data/docs";
import { FiMenu, FiX } from "react-icons/fi";

// Lazy load icone per ridurre bundle iniziale
const MenuIcon = dynamic(
  () => import("react-icons/fi").then((mod) => mod.FiMenu),
  { ssr: false },
);
const CloseIcon = dynamic(
  () => import("react-icons/fi").then((mod) => mod.FiX),
  { ssr: false },
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-neutral-200 glass-section"
      style={{ height: "var(--header-height)" }}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-tight text-black">
          AI Docs
        </h1>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {docs.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="hover:text-black transition-colors duration-200"
              prefetch={false} // evita prefetch inutile se tante pagine
            >
              {page.title}
            </Link>
          ))}
        </nav>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-neutral-100 transition-colors duration-200"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          onClick={toggleMobile}
        >
          {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (
        <nav
          className="md:hidden fixed inset-x-0 top-[var(--header-height)] bg-white/80 border-t border-neutral-200 shadow-md z-40 animate-slideDown"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col p-4 gap-2">
            {docs.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="block text-black font-medium py-2 px-4 rounded-lg hover:bg-white/50 transition-colors duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  {page.title}
                </Link>
                {page.children && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {page.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block text-sm text-black px-3 py-1 rounded-lg hover:bg-white/50 transition-colors duration-200"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default memo(Header); // memo evita render ridondanti
