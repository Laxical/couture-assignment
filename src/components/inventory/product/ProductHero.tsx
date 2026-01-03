import ProductPrice from "./ProductPrice"; // Import ProductPrice component

export default function ProductHero({ product }: any) {
  const inStock = product.stock > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-start">
      {/* IMAGES */}
      <div className="space-y-6 lg:w-[55%]">
        <div className="aspect-[4/5] w-full bg-[#F9F8F6] border border-border/40 rounded-2xl shadow-sm flex items-center justify-center overflow-hidden transition-all duration-500 hover:shadow-xl group">
          <img
            src={product.thumbnail || "/placeholder.svg"}
            className="max-w-[85%] max-h-[85%] object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            alt={product.title}
          />
        </div>

        {product.images?.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl overflow-hidden"
              >
                <img
                  src={img || "/placeholder.svg"}
                  className="w-24 h-24 object-contain border border-border/40 rounded-xl bg-card p-2 hover:bg-muted transition-colors"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex-1 space-y-8 sticky top-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/80">
              {product.brand || product.category}
            </span>
            <span className="h-px w-8 bg-border"></span>
            <span
              className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                inStock ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {inStock ? "Available" : "Limited Stock"}
            </span>
          </div>

          <h1 className="text-5xl font-serif tracking-tight leading-[1.1] text-foreground">
            {product.title}
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        <div className="pt-4 border-t border-border/50">
          <ProductPrice product={product} />
        </div>

        <div className="flex gap-4 pt-4">
          <button className="flex-1 bg-foreground text-background font-medium h-14 rounded-full transition-transform active:scale-[0.98] hover:bg-foreground/90 shadow-lg">
            Acquire Now
          </button>
          <button className="w-14 h-14 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
