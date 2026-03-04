"use client";
import React, { useState } from "react";
import Link from "next/link";
import { docs } from "@/data/docs";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50" style={{ height: "var(--header-height)" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-lg font-semibold tracking-tight">AI Docs</div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {docs.map((page) => (
            <Link key={page.href} href={page.href} className="hover:text-black">
              {page.title}
            </Link>
          ))}
        </nav>

        {/* Menu mobile toggle */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-neutral-200">
          <ul className="flex flex-col p-4 gap-2">
            {docs.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-black font-medium">
                  {page.title}
                </Link>
                {page.children && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {page.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-sm hover:text-black"
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
}