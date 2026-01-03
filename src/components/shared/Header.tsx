"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  ShoppingBag,
  Search,
  ChevronRight,
  User,
  Package,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import SearchResults from "@/components/header/SearchResult";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await searchProducts({
          q: value,
          limit: 5,
          skip: 0,
        });
        setSearchResults(response.products);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const navLinks = [
    { name: "Products", href: "/inventory", icon: Package },
    { name: "Categories", href: "/inventory/categories", icon: LayoutGrid },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 transition-all duration-300">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
                Inventory
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block relative" ref={searchContainerRef}>
              <div className="flex items-center bg-muted/50 rounded-full px-3 py-1.5 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="bg-transparent border-none outline-none text-sm ml-2 w-50 focus:w-98 transition-all"
                />
              </div>
              {showResults && (
                <SearchResults
                  results={searchResults}
                  isLoading={isSearching}
                  query={searchQuery}
                  onClose={() => {
                    setShowResults(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                />
              )}
            </div>

            <Link href="/inventory" className="hidden sm:flex">
              <Button
                variant="default"
                className="rounded-full px-6 font-semibold shadow-md shadow-primary/10"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-xl hover:bg-muted"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] p-0 border-l-0 shadow-2xl"
              >
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-6 border-b border-border/50 text-left">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-2xl font-bold tracking-tight">
                        Menu
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="p-6 space-y-8 overflow-y-auto flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 h-11 bg-muted/30 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
                      />
                      {showResults && (
                        <div className="mt-2">
                          <SearchResults
                            results={searchResults}
                            isLoading={isSearching}
                            query={searchQuery}
                            onClose={() => {
                              setShowResults(false);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <nav className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 px-3 mb-3">
                        Navigation
                      </p>
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                <link.icon className="w-5 h-5" />
                              </div>
                              <span className="font-semibold text-foreground/90">
                                {link.name}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 px-3 mb-3">
                        Account
                      </p>
                      <SheetClose asChild>
                        <Link
                          href="/login"
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <User className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-foreground/90">
                            Sign In
                          </span>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  <div className="p-6 border-t border-border/50">
                    <SheetClose asChild>
                      <Button className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/20">
                        Get Started
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
