"use client";

import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import InfiniteLoader from "./InfiniteLoader";

export default function ProductGrid({
  products,
  bootstrapped,
}: {
  products: Product[];
  bootstrapped: boolean;
}) {
  if (!bootstrapped) {
    return <InfiniteLoader loading={true} />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          No products found
        </h3>

        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your filters or search terms to find what you’re looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
