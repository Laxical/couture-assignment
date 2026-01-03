"use client";

import type { Category } from "@/types/product";

interface Props {
  onSearch: (v: string) => void;
  setSort: (v: string) => void;
  setOrder: (v: "asc" | "desc" | "") => void;
  setCategory: (v: string) => void;
  setStockFilter: (v: "all" | "in" | "out") => void;
  categories: Category[];
  category: string;
}

export default function FiltersBar({
  onSearch,
  setSort,
  setOrder,
  setCategory,
  setStockFilter,
  categories,
  category,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Products
          </label>
          <input
            placeholder="Type to search..."
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sort By
          </label>
          <select
            className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition cursor-pointer"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Order Dropdown */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Order
          </label>
          <select
            className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition cursor-pointer"
            onChange={(e) => setOrder(e.target.value as any)}
          >
            <option value="">Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={category}
            className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter Dropdown */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Stock
          </label>
          <select
            className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition cursor-pointer"
            onChange={(e) => setStockFilter(e.target.value as any)}
          >
            <option value="all">Any Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
}
