"use client";
import React, { useState } from "react";
import Link from "next/link";
import { docs } from "@/data/docs";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiMenu } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  // Normalizza pathname e href per evitare problemi con la home "/"
  const isActive = (href: string) => {
    const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
    return normalize(pathname) === normalize(href);
  };

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  return (
    <aside
      className={`sticky top-0 h-screen border-r border-neutral-200 bg-transparent transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Spazio logo + pulsante hamburger */}
      <div
        className="relative flex items-center border-b border-neutral-200 text-black"
        style={{ height: "var(--header-height)" }}
      >
        {/* Logo (sparisce quando sidebar chiusa) */}
        <div
          className={`font-bold text-lg px-4 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          AI Docs
        </div>

        {/* Pulsante sempre visibile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute right-3 p-2 rounded hover:bg-neutral-100"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Contenuto principale della sidebar */}
      <ul className="mt-2 space-y-4 text-sm text-neutral-600 pt-2">
        {docs.map((page, index) => (
          <React.Fragment key={page.href}>
            {/* Separatore tra gruppi */}
            {index !== 0 && sidebarOpen && (
              <hr className="border-neutral-200 my-2" />
            )}

            <li>
              {page.children ? (
                <>
                  {/* Titolo sezione con toggle */}
                  <div
                    className={`flex items-center justify-between cursor-pointer hover:text-black font-medium px-4 py-2 ${
                      !sidebarOpen ? "justify-center" : ""
                    }`}
                    onClick={() => toggleSection(page.href)}
                  >
                    <span className={`${sidebarOpen ? "inline" : "hidden"}`}>
                      {page.title}
                    </span>
                    {sidebarOpen && (
                      <FiChevronRight
                        className={`transition-transform duration-200 ${openSections[page.href] ? "rotate-90" : "rotate-0"}`}
                      />
                    )}
                  </div>

                  {/* Sotto-link */}
                  {openSections[page.href] && sidebarOpen && (
                    <ul className="ml-4 mt-2 space-y-1 border-l border-neutral-200 pl-3">
                      {page.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`flex items-center gap-1 text-sm hover:text-black ${
                              isActive(child.href)
                                ? "font-semibold text-black"
                                : ""
                            }`}
                          >
                            <span className="w-3 h-3 inline-block bg-neutral-400 rounded-full"></span>
                            {child.title}
                          </Link>
                        </li>
                      ))}

                      {/* Extra */}
                      <li>
                        <Link
                          href={`${page.href}/extra`}
                          className={`flex items-center gap-1 text-sm hover:text-black ${
                            isActive(`${page.href}/extra`)
                              ? "font-semibold text-black"
                              : ""
                          }`}
                        >
                          <span className="w-3 h-3 inline-block bg-neutral-400 rounded-full"></span>
                          Extra {page.title}
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                // Link semplice per pagine senza children (es. Home)
                <Link
                  href={page.href}
                  className={`block px-4 py-2 hover:text-black ${
                    isActive(page.href) ? "font-semibold text-black" : ""
                  }`}
                >
                  {sidebarOpen && page.title}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </aside>
  );
}
