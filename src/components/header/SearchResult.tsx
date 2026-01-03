"use client";

import type { Product } from "@/types/product";
import { Star, Package } from "lucide-react";
import Link from "next/link";

interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchResults({
  results,
  isLoading,
  query,
  onClose,
}: SearchResultsProps) {
  if (!query) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[500px] overflow-y-auto">
      {isLoading ? (
        <div className="p-8 flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Searching...</span>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="divide-y divide-border">
          <div className="px-4 py-3 bg-muted/30">
            <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Top {results.length} Results for "{query}"
            </p>
          </div>
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/inventory/${product.id}`}
              onClick={onClose}
              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group"
            >
              {/* Product Image */}
              <div className="w-16 h-16 rounded-xl bg-muted flex-shrink-0 overflow-hidden border border-border">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {product.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {product.description}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex-shrink-0 text-right">
                <p className="text-lg font-bold text-foreground">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground mb-1">
            No products found
          </p>
          <p className="text-sm text-muted-foreground">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  );
}
