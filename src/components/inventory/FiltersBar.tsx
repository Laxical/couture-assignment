"use client";

import { useState } from "react";
import type { Category } from "@/types/product";
import { Search, SlidersHorizontal } from "lucide-react";

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
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 mb-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filter & Sort</h2>
      </div>

      {/* Primary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2.5">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2.5">
            Sort By
          </label>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
          >
            <option value="">Default</option>
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2.5">
            Order
          </label>
          <select
            onChange={(e) => setOrder(e.target.value as any)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
          >
            <option value="">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Toggle Advanced */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowAdvanced((p) => !p)}
          className="text-sm font-medium text-primary hover:underline"
        >
          {showAdvanced ? "Hide Advanced Filters ▲" : "Show Advanced Filters ▼"}
        </button>
      </div>

      {/* Advanced Row - Collapsible */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          showAdvanced ? "max-h-40 mt-5 pt-5 border-t border-border" : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Stock Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2.5">
              Stock Status
            </label>
            <select
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
            >
              <option value="all">All Products</option>
              <option value="in">In Stock Only</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
