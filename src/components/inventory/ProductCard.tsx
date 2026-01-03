import { Product } from "@/types/product";

export default function ProductCard({ p }: { p: Product }) {
  const inStock = p.stock > 0;

  return (
    <div
      className="rounded-xl border shadow-sm hover:shadow-xl transition cursor-pointer bg-white overflow-hidden"
      onClick={() => (window.location.href = `/inventory/${p.id}`)}
    >
      <div className="relative w-full h-48 bg-gray-100">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="w-full h-full object-contain p-2"
        />

        <span
          className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-semibold ${
            inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="p-4">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 mb-2">
          {p.category}
        </span>

        <h2 className="font-semibold text-lg line-clamp-2">{p.title}</h2>

        <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-blue-700">${p.price}</span>
          <span className="text-sm text-yellow-600">⭐ {p.rating}</span>
        </div>
      </div>
    </div>
  );
}
