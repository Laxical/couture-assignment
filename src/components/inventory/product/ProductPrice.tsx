"use client";

export default function ProductPrice({ product }: any) {
  const discount = product.discountPercentage || 0;
  const discounted = product.price;

  const original =
    discount > 0 ? discounted / (1 - discount / 100) : discounted;

  const savings = discount > 0 ? original - discounted : 0;

  return (
    <div className="space-y-3 p-5 bg-muted border border-border rounded-lg">
      <div className="flex items-end gap-3">
        <h2 className="text-4xl font-bold text-primary">
          ${discounted.toFixed(2)}
        </h2>

        {discount > 0 && (
          <span className="text-muted-foreground line-through text-xl">
            ${original.toFixed(2)}
          </span>
        )}
      </div>

      {discount > 0 && (
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 font-semibold text-sm">
            Save ${savings.toFixed(2)}
          </span>

          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-300 font-semibold text-sm">
            {discount}% OFF
          </span>
        </div>
      )}
    </div>
  );
}
