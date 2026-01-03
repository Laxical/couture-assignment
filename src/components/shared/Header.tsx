"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 animate-slide-down ${
        isScrolled
          ? "bg-white/95 shadow-lg backdrop-blur-sm border-b border-border"
          : "bg-gradient-to-b from-white to-white/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">Inventory</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/inventory"
              className="text-foreground/70 hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              href="/inventory/categories"
              className="text-foreground/70 hover:text-primary transition-colors font-medium"
            >
              Categories
            </Link>
          </nav>

          <Link
            href="/inventory"
            className="hidden sm:inline-flex px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Get Started
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
