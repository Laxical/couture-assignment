"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchProducts,
  searchProducts,
  getCategories,
  fetchByCategory,
} from "@/lib/api";

import type { Product, Category, PaginatedResponse } from "@/types/product";
import { useSearchParams } from "next/navigation";
import FiltersBar from "@/components/inventory/FiltersBar";
import ProductGrid from "@/components/inventory/ProductGrid";
import InfiniteLoader from "@/components/inventory/InfiniteLoader";

const PAGE_SIZE = 12;

export default function InventoryScrollPageClient() {
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState<"" | "asc" | "desc">("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prevFiltersRef = useRef({
    search,
    category,
    sort,
    order,
    stockFilter,
  });

  const applyClientSort = (list: Product[]) => {
    if (!sort) return list;
    return [...list].sort((a: any, b: any) => {
      if (order === "desc") return a[sort] < b[sort] ? 1 : -1;
      return a[sort] > b[sort] ? 1 : -1;
    });
  };

  const applyStockFilter = (list: Product[]) => {
    if (stockFilter === "in") return list.filter((p) => p.stock > 0);
    if (stockFilter === "out") return list.filter((p) => p.stock === 0);
    return list;
  };

  const loadProducts = async (
    currentPage: number,
    currentFilters: {
      search: string;
      category: string;
      sort: string;
      order: string;
      stockFilter: "all" | "in" | "out";
    },
    shouldReplace: boolean
  ) => {
    if (loading) return;

    const skip = (currentPage - 1) * PAGE_SIZE;
    setLoading(true);

    try {
      let data: PaginatedResponse;

      if (currentFilters.search && currentFilters.category) {
        const raw = await fetchByCategory({
          category: currentFilters.category,
          limit: 0,
          skip: 0,
        });

        let filtered = raw.products.filter((p) =>
          p.title.toLowerCase().includes(currentFilters.search.toLowerCase())
        );

        filtered = applyStockFilter(filtered);
        filtered = applyClientSort(filtered);

        setTotal(filtered.length);

        const slice = filtered.slice(skip, skip + PAGE_SIZE);
        setProducts((prev) => (shouldReplace ? slice : [...prev, ...slice]));
        return;
      }

      // --- SEARCH ONLY
      if (currentFilters.search) {
        data = await searchProducts({
          q: currentFilters.search,
          limit: PAGE_SIZE,
          skip,
          sortBy: currentFilters.sort,
          order: currentFilters.order,
        });

        let list = applyStockFilter(data.products);
        list = applyClientSort(list);

        setTotal(data.total);
        setProducts((prev) => (shouldReplace ? list : [...prev, ...list]));
      }

      // --- CATEGORY ONLY
      else if (currentFilters.category) {
        data = await fetchByCategory({
          category: currentFilters.category,
          limit: PAGE_SIZE,
          skip,
          sortBy: currentFilters.sort,
          order: currentFilters.order,
        });

        let list = applyStockFilter(data.products);
        list = applyClientSort(list);

        setTotal(data.total);
        setProducts((prev) => (shouldReplace ? list : [...prev, ...list]));
      }

      // --- NORMAL
      else {
        const effectiveSort =
          currentFilters.sort || (currentFilters.order ? "title" : "");

        data = await fetchProducts({
          limit: PAGE_SIZE,
          skip,
          sortBy: effectiveSort,
          order: currentFilters.order,
        });

        let list = applyStockFilter(data.products);
        list = applyClientSort(list);

        setTotal(data.total);
        setProducts((prev) => (shouldReplace ? list : [...prev, ...list]));
      }
    } catch (err) {
      console.error("Failed loading products", err);
    } finally {
      setLoading(false);
    }
  };

  // Load Categories Once
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Handle Filter + Page Logic
  useEffect(() => {
    const prevFilters = prevFiltersRef.current;

    const filtersChanged =
      prevFilters.search !== search ||
      prevFilters.category !== category ||
      prevFilters.sort !== sort ||
      prevFilters.order !== order ||
      prevFilters.stockFilter !== stockFilter;

    if (filtersChanged) {
      setProducts([]);
      setTotal(0);
      setPage(1);

      prevFiltersRef.current = {
        search,
        category,
        sort,
        order,
        stockFilter,
      };

      loadProducts(1, { search, category, sort, order, stockFilter }, true);
      return;
    }

    if (page > 1) {
      loadProducts(page, { search, category, sort, order, stockFilter }, false);
    } else {
      loadProducts(page, { search, category, sort, order, stockFilter }, true);
    }
  }, [page, search, category, sort, order, stockFilter]);

  // Infinite Scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          products.length > 0 &&
          products.length < total
        ) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [products, total, loading]);

  // Search debounce
  const onSearch = (v: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setSearch(v), 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Inventory Dashboard
                </span>
              </h1>

              <p className="text-muted-foreground mt-2 text-lg">
                Real-time visibility into your catalogue performance
              </p>
            </div>

            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-sm font-semibold">
                {total} Products
              </span>

              <span className="px-4 py-2 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 text-sm font-semibold">
                {categories.length} Categories
              </span>
            </div>
          </div>
        </div>

        <FiltersBar
          onSearch={onSearch}
          setSort={setSort}
          setOrder={setOrder}
          setCategory={setCategory}
          setStockFilter={setStockFilter}
          categories={categories}
          category={category}
        />

        <ProductGrid products={products} />

        <InfiniteLoader ref={loaderRef} loading={loading} />
      </div>
    </div>
  );
}
