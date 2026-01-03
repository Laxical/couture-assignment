"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { searchProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import SearchResults from "./SearchResult";

export default function DesktopSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  return (
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
  );
}
