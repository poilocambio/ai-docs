"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docs } from "@/data/docs";
import dynamic from "next/dynamic";

// lazy icons
const ChevronRight = dynamic(
  () => import("react-icons/fi").then((m) => m.FiChevronRight),
  { ssr: false },
);
const MenuIcon = dynamic(() => import("react-icons/fi").then((m) => m.FiMenu), {
  ssr: false,
});

const Sidebar = () => {
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSection = useCallback((href: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const isActive = useCallback(
    (href: string) =>
      pathname.replace(/\/+$/, "") === href.replace(/\/+$/, "") ||
      (href === "/" && pathname === "/"),
    [pathname],
  );

  return (
    <aside
      className={`hidden md:flex flex-col sticky top-0 h-screen border-r border-neutral-200 bg-white transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
      aria-label="Sidebar"
    >
      {/* HEADER */}
      <div
        className="flex items-center border-b border-neutral-200 px-4 py-3"
        style={{ height: "var(--header-height)" }}
      >
        <div
          className={`font-semibold tracking-tight transition-all duration-200 ${
            sidebarOpen ? "opacity-100 flex-1" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          AI Docs
        </div>

        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-md hover:bg-neutral-100 transition"
        >
          <MenuIcon size={18} />
        </button>
      </div>

      {/* NAV */}
      <ul className="flex-1 overflow-y-auto py-3 text-sm px-2">
        {docs.map((page, index) => (
          <React.Fragment key={page.href}>
            {index !== 0 && sidebarOpen && (
              <div className="my-3 border-t border-neutral-200" />
            )}

            <li>
              {page.children ? (
                <>
                  {/* SECTION HEADER */}
                  <button
                    onClick={() => toggleSection(page.href)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition hover:bg-neutral-100 ${
                      !sidebarOpen ? "justify-center" : ""
                    }`}
                  >
                    {sidebarOpen && (
                      <span className="font-medium text-neutral-700">
                        {page.title}
                      </span>
                    )}

                    {sidebarOpen && (
                      <ChevronRight
                        size={16}
                        className={`transition-transform ${
                          openSections[page.href] ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* CHILDREN */}
                  {openSections[page.href] && sidebarOpen && (
                    <ul className="ml-3 mt-2 space-y-1 border-l border-neutral-200 pl-3">
                      {page.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition ${
                              isActive(child.href)
                                ? "bg-neutral-100 text-black font-medium"
                                : "text-neutral-600 hover:bg-neutral-100"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                            {child.title}
                          </Link>
                        </li>
                      ))}

                      <li>
                        <Link
                          href={`${page.href}/extra`}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition ${
                            isActive(`${page.href}/extra`)
                              ? "bg-neutral-100 text-black font-medium"
                              : "text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          Extra {page.title}
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={page.href}
                  className={`block px-3 py-2 rounded-md transition ${
                    isActive(page.href)
                      ? "bg-neutral-100 text-black font-medium"
                      : "text-neutral-600 hover:bg-neutral-100"
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
