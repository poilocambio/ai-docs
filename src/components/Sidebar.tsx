"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { docs } from "@/data/docs";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiMenu } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSection = useCallback((href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const isActive = useCallback((href: string) => {
    const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
    return normalize(pathname) === normalize(href);
  }, [pathname]);

  return (
    <aside
      className={`hidden md:block sticky top-0 h-screen border-r border-neutral-200 bg-transparent transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header sidebar */}
      <div className="relative flex items-center border-b border-neutral-200 text-black" style={{ height: "var(--header-height)" }}>
        <div className={`font-bold text-lg px-4 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
          AI Docs
        </div>
        <button onClick={toggleSidebar} className="absolute right-3 p-2 rounded hover:bg-neutral-100">
          <FiMenu size={20} />
        </button>
      </div>

      <ul className="mt-2 space-y-4 text-sm text-neutral-600 pt-2">
        {docs.map((page, index) => (
          <React.Fragment key={page.href}>
            {index !== 0 && sidebarOpen && <hr className="border-neutral-200 my-2" />}

            <li>
              {page.children ? (
                <>
                  <div
                    className={`flex items-center justify-between cursor-pointer hover:text-black font-medium px-4 py-2 ${
                      !sidebarOpen ? "justify-center" : ""
                    }`}
                    onClick={() => toggleSection(page.href)}
                  >
                    <span className={`${sidebarOpen ? "inline" : "hidden"}`}>{page.title}</span>
                    {sidebarOpen && <FiChevronRight className={`transition-transform duration-200 ${openSections[page.href] ? "rotate-90" : "rotate-0"}`} />}
                  </div>
                  {openSections[page.href] && sidebarOpen && (
                    <ul className="ml-4 mt-2 space-y-1 border-l border-neutral-200 pl-3">
                      {page.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={`flex items-center gap-1 text-sm hover:text-black ${isActive(child.href) ? "font-semibold text-black" : ""}`}>
                            <span className="w-3 h-3 inline-block bg-neutral-400 rounded-full" />
                            {child.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href={`${page.href}/extra`} className={`flex items-center gap-1 text-sm hover:text-black ${isActive(`${page.href}/extra`) ? "font-semibold text-black" : ""}`}>
                          <span className="w-3 h-3 inline-block bg-neutral-400 rounded-full" />
                          Extra {page.title}
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link href={page.href} className={`block px-4 py-2 hover:text-black ${isActive(page.href) ? "font-semibold text-black" : ""}`}>
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