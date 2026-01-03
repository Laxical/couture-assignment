"use client";

export default function ProductSimilar({ related }: any) {
  if (!related?.length) return null;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-2 mb-12">
          <p className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Discovery
          </p>
          <h2 className="text-4xl font-light tracking-tight text-foreground">
            Curated Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {related.slice(0, 6).map((p: any) => (
            <button
              key={p.id}
              onClick={() => (window.location.href = `/inventory/${p.id}`)}
              className="group text-left space-y-4"
            >
              {/* Product Card Container */}
              <div className="relative aspect-[4/5] bg-muted/30 border border-border/40 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img
                  src={p.thumbnail || "/placeholder.svg"}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                  alt={p.title}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick View Overlay (Visual only) */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-full py-2.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold tracking-[0.1em] uppercase text-center rounded-lg shadow-xl">
                    Explore Item
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1 px-1">
                <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                  {p.brand || p.category}
                </p>
                <h3 className="text-lg font-light tracking-tight text-foreground line-clamp-1 group-hover:text-muted-foreground transition-colors">
                  {p.title}
                </h3>
                <p className="text-base font-medium text-foreground">
                  ${p.price.toFixed(2)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
