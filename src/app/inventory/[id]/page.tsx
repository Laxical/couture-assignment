"use client";

import Barcode from "@/components/inventory/BarCode";
import { fetchByCategory } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await fetch(
          `https://dummyjson.com/products/${params.id}`
        ).then((res) => res.json());

        setProduct(productData);

        const relatedData = await fetchByCategory({
          category: productData.category,
          limit: 7,
          skip: 0,
        });

        setRelated(relatedData.products.filter((p) => p.id !== productData.id));
      } catch (error) {
        console.error("Failed to load product details", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!product) return <div className="p-6 text-center">Product not found</div>;

  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* ---------- TOP SECTION ---------- */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Images */}
          <div className="space-y-4 lg:w-1/2">
            <div className="w-full h-96 bg-muted rounded-lg shadow-sm flex items-center justify-center overflow-hidden border border-border">
              <img
                src={product.thumbnail || "/placeholder.svg"}
                className="max-w-full max-h-full object-contain p-4"
                alt={product.title}
              />
            </div>

            {/* Image Thumbnails */}
            {product.images?.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images?.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img || "/placeholder.svg"}
                    className="w-20 h-20 object-contain border border-border rounded-md bg-card p-1 hover:scale-110 hover:border-primary transition-transform"
                    alt={`Product ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                  {product.category}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    inStock
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {product.availabilityStatus ||
                    (inStock ? "In Stock" : "Out of Stock")}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Pricing Section */}
            <div className="space-y-2 p-4 bg-muted rounded-lg border border-border">
              <div className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-accent font-semibold">
                  Save {product.discountPercentage}% off
                </p>
              )}
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg border border-border">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-semibold text-foreground">{product.brand}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-semibold text-foreground">{product.sku}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-semibold text-foreground">
                  ⭐ {product.rating}/5
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Min Order</p>
                <p className="font-semibold text-foreground">
                  {product.minimumOrderQuantity} units
                </p>
              </div>
            </div>

            {/* Warranty + Shipping Info */}
            <div className="space-y-3 p-4 bg-card rounded-lg border border-border">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase">
                  Warranty
                </p>
                <p className="text-foreground">{product.warrantyInformation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase">
                  Shipping
                </p>
                <p className="text-foreground">{product.shippingInformation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-muted-foreground uppercase">
                  Returns
                </p>
                <p className="text-foreground">{product.returnPolicy}</p>
              </div>
            </div>

            {/* Dimensions */}
            {product.dimensions && (
              <div className="space-y-3 p-4 bg-muted rounded-lg border border-border">
                <h3 className="font-semibold text-foreground">Dimensions</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Width</p>
                    <p className="font-semibold text-foreground">
                      {product.dimensions?.width}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Height</p>
                    <p className="font-semibold text-foreground">
                      {product.dimensions?.height}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Depth</p>
                    <p className="font-semibold text-foreground">
                      {product.dimensions?.depth}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {product.tags.map((t: string) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 text-secondary border border-secondary/30"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---------- REVIEWS ---------- */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Customer Reviews
            </h2>
            <p className="text-muted-foreground mt-1">
              {product.reviews?.length || 0} reviews
            </p>
          </div>

          {product.reviews?.length === 0 ? (
            <div className="p-8 bg-muted rounded-lg border border-border text-center">
              <p className="text-muted-foreground">No reviews yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {product.reviews?.map((r: any, i: number) => (
                <div
                  key={i}
                  className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground">
                        {r.reviewerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(r.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-amber-600 font-semibold">
                      ⭐ {r.rating}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- METADATA / BARCODE ---------- */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Product Details
          </h2>
          <div className="border border-border rounded-lg p-6 bg-card">
            <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
              Barcode
            </p>
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
              <Barcode value={product.meta?.barcode || "000000000000"} />
            </div>
          </div>
        </div>

        {/* ---------- SIMILAR PRODUCTS ---------- */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Similar Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 6).map((p: any) => (
              <button
                key={p.id}
                onClick={() => (window.location.href = `/inventory/${p.id}`)}
                className="text-left border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg hover:border-primary transition-all"
              >
                <div className="w-full h-40 bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={p.thumbnail || "/placeholder.svg"}
                    className="max-w-full max-h-full object-contain p-2"
                    alt={p.title}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-primary font-bold">
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
