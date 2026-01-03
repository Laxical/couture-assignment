"use client";

export default function ProductPrice({ product }: any) {
  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = product.price;
  const discountedPrice = hasDiscount
    ? (originalPrice * (1 - product.discountPercentage / 100)).toFixed(2)
    : originalPrice;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-4">
        <span className="text-4xl font-light tracking-tight text-foreground">
          ${hasDiscount ? discountedPrice : originalPrice}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-muted-foreground line-through font-light">
              ${originalPrice}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
              Save {product.discountPercentage}%
            </span>
          </>
        )}
      </div>

      {product.stock && (
        <p className="text-sm text-muted-foreground">
          {product.stock > 10 ? (
            <span className="text-emerald-600 font-medium">In Stock</span>
          ) : (
            <span className="text-amber-600 font-medium">
              Only {product.stock} left
            </span>
          )}
        </p>
      )}
    </div>
  );
}
