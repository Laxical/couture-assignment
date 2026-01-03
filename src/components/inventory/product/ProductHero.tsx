"use client";
import ProductPrice from "./ProductPrice";

export default function ProductHero({ product }: any) {
  const inStock = product.stock > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* IMAGES */}
      <div className="space-y-4 lg:w-1/2">
        <div className="w-full h-96 bg-muted border border-border rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail || "/placeholder.svg"}
            className="max-w-full max-h-full object-contain p-6"
          />
        </div>

        {product.images?.length > 0 && (
          <div className="flex gap-3 overflow-x-auto">
            {product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 object-contain border border-border rounded-md bg-card p-1 hover:scale-110 transition"
              />
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            {product.title}
          </h1>

          <div className="flex gap-3 mt-3 flex-wrap">
            <span className="px-4 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20">
              {product.category}
            </span>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold border 
                  ${
                    inStock
                      ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                      : "bg-red-100 text-red-700 border-red-300"
                  }`}
            >
              {product.availabilityStatus ||
                (inStock ? "In Stock" : "Out of Stock")}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-lg leading-relaxed">
          {product.description}
        </p>

        <ProductPrice product={product} />
      </div>
    </div>
  );
}
