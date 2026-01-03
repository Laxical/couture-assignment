"use client";

export default function ProductSimilar({ related }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Similar Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.slice(0, 6).map((p: any) => (
          <button
            key={p.id}
            onClick={() => (window.location.href = `/inventory/${p.id}`)}
            className="text-left bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition"
          >
            <div className="w-full h-40 bg-muted flex items-center justify-center">
              <img
                src={p.thumbnail}
                className="max-w-full max-h-full object-contain p-2"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold line-clamp-1">{p.title}</h3>
              <p className="text-primary font-bold">${p.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
