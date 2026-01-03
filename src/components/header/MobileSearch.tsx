"use client";

import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import SearchResults from "./SearchResult";

interface MobileSearchProps {
  onNavigate: () => void; // Callback to close the sheet
}

export default function MobileSearch({ onNavigate }: MobileSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleClose = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
    onNavigate();
  };

  return (
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
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
