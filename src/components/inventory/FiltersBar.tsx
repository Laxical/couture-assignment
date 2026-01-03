import { Category } from "@/types/product";

interface Props {
  onSearch: (v: string) => void;
  setSort: (v: string) => void;
  setOrder: (v: "asc" | "desc" | "") => void;
  setCategory: (v: string) => void;
  setStockFilter: (v: "all" | "in" | "out") => void;
  categories: Category[];
}

export default function FiltersBar({
  onSearch,
  setSort,
  setOrder,
  setCategory,
  setStockFilter,
  categories,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        placeholder="Search products..."
        className="border p-2 rounded w-64"
        onChange={(e) => onSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="title">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) => setOrder(e.target.value as any)}
      >
        <option value="">Order</option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      {/* STOCK FILTER */}
      <select
        className="border p-2 rounded"
        onChange={(e) => setStockFilter(e.target.value as any)}
      >
        <option value="all">Any Stock</option>
        <option value="in">In Stock</option>
        <option value="out">Out of Stock</option>
      </select>
    </div>
  );
}
