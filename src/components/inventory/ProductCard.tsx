"use client";

import type { Product } from "@/types/product";

export default function ProductCard({ p }: { p: Product }) {
  const inStock = p.stock > 0;

  return (
    <div
      className="rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-card overflow-hidden hover:scale-105 transform"
      onClick={() => (window.location.href = `/inventory/${p.id}`)}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={p.thumbnail || "/placeholder.svg"}
          alt={p.title}
          className="w-full h-full object-contain p-3 hover:scale-110 transition-transform duration-300"
        />

        {/* Stock Badge */}
        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold transition-all ${
            inStock
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium mb-2.5">
          {p.category}
        </span>

        {/* Title */}
        <h2 className="font-semibold text-sm text-foreground line-clamp-2 mb-1.5">
          {p.title}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
          {p.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-bold text-primary text-sm">${p.price}</span>
          <span className="text-xs text-accent font-medium">⭐ {p.rating}</span>
        </div>
      </div>
    </div>
  );
}
