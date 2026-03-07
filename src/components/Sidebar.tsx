"use client";
import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/data/docs";
import { FiChevronRight, FiMenu } from "react-icons/fi";
import dynamic from "next/dynamic";

// Lazy load icone per ridurre bundle iniziale
const ChevronRight = dynamic(() => import("react-icons/fi").then(mod => mod.FiChevronRight), { ssr: false });
const MenuIcon = dynamic(() => import("react-icons/fi").then(mod => mod.FiMenu), { ssr: false });

const Sidebar = () => {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSection = useCallback((href: string) => {
    setOpenSections(prev => ({ ...prev, [href]: !prev[href] }));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  const isActive = useCallback(
    (href: string) => pathname.replace(/\/+$/, "") === href.replace(/\/+$/, "") || (href === "/" && pathname === "/"),
    [pathname]
  );

  return (
    <aside
      className={`glass-section hidden md:flex flex-col sticky top-0 h-screen transition-all duration-300 overflow-y-auto shadow-lg ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
      aria-label="Sidebar principale"
    >
      {/* Header sidebar */}
      <div className="relative flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-black" style={{ height: "var(--header-height)" }}>
        <div className={`font-bold text-lg transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>AI Docs</div>
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded hover:bg-neutral-100 transition-colors duration-200 absolute right-3"
        >
          <MenuIcon size={20} />
        </button>
      </div>

      {/* Contenuto */}
      <ul className="mt-2 flex-1 space-y-1 text-sm text-neutral-600 px-1">
        {docs.map((page, index) => (
          <React.Fragment key={page.href}>
            {index !== 0 && sidebarOpen && <hr className="border-neutral-200 my-2 mx-2" />}
            <li>
              {page.children ? (
                <>
                  {/* Sezione con toggle */}
                  <div
                    className={`flex items-center justify-between cursor-pointer font-medium px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-white/20 ${
                      !sidebarOpen ? "justify-center" : ""
                    }`}
                    onClick={() => toggleSection(page.href)}
                  >
                    <span className={`${sidebarOpen ? "inline" : "hidden"}`}>{page.title}</span>
                    {sidebarOpen && <ChevronRight className={`transition-transform duration-200 ${openSections[page.href] ? "rotate-90 text-black" : "rotate-0 text-neutral-500"}`} />}
                  </div>

                  {/* Sotto-link */}
                  {openSections[page.href] && sidebarOpen && (
                    <ul className="ml-4 mt-2 space-y-1 border-l border-white/20 pl-3">
                      {page.children.map(child => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-white/20 ${
                              isActive(child.href) ? "font-semibold text-black bg-white/30" : "text-neutral-600"
                            }`}
                          >
                            <span className="w-2 h-2 inline-block bg-neutral-400 rounded-full" />
                            {child.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={`${page.href}/extra`}
                          className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-white/20 ${
                            isActive(`${page.href}/extra`) ? "font-semibold text-black bg-white/30" : "text-neutral-600"
                          }`}
                        >
                          <span className="w-2 h-2 inline-block bg-neutral-400 rounded-full" />
                          Extra {page.title}
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={page.href}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-white/20 ${
                    isActive(page.href) ? "font-semibold text-black bg-white/30" : "text-neutral-600"
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
};

export default memo(Sidebar);