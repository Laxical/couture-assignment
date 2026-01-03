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
    <div className="p-6 space-y-10">
      {/* ---------- TOP SECTION ---------- */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div className="w-full md:w-96 h-96 bg-gray-100 rounded shadow flex items-center justify-center overflow-hidden">
            <img
              src={product.thumbnail}
              className="max-w-full max-h-full object-contain p-4"
              alt={product.title}
            />
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-3 overflow-x-auto">
            {product.images?.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                className="w-20 h-20 object-contain border rounded-lg bg-white p-1 hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold">{product.title}</h1>

          <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            {product.category}
          </span>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="mt-6 text-2xl font-bold text-blue-700">
            ${product.price}
          </div>

          <p className="text-green-600 font-medium mt-1">
            Discount: {product.discountPercentage}%
          </p>

          {/* Stock */}
          <div className="mt-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.availabilityStatus ||
                (inStock ? "In Stock" : "Out of Stock")}
            </span>
          </div>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <b>Brand:</b> {product.brand}
            </p>
            <p>
              <b>SKU:</b> {product.sku}
            </p>
            <p>
              <b>Rating:</b> ⭐ {product.rating}
            </p>
            <p>
              <b>Min Order Qty:</b> {product.minimumOrderQuantity}
            </p>
          </div>

          {/* Warranty + Shipping */}
          <div className="mt-6 space-y-2">
            <p>
              <b>Warranty:</b> {product.warrantyInformation}
            </p>
            <p>
              <b>Shipping:</b> {product.shippingInformation}
            </p>
            <p>
              <b>Return Policy:</b> {product.returnPolicy}
            </p>
          </div>

          {/* Dimensions */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Dimensions</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <p>
                <b>Width:</b> {product.dimensions?.width}
              </p>
              <p>
                <b>Height:</b> {product.dimensions?.height}
              </p>
              <p>
                <b>Depth:</b> {product.dimensions?.depth}
              </p>
            </div>
          </div>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="mt-6 flex gap-2 flex-wrap">
              {product.tags.map((t: string) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------- REVIEWS ---------- */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>

        {product.reviews?.length === 0 && (
          <p className="text-gray-500">No reviews yet</p>
        )}

        <div className="space-y-4">
          {product.reviews?.map((r: any, i: number) => (
            <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between">
                <b>{r.reviewerName}</b>
                <span className="text-yellow-600">⭐ {r.rating}</span>
              </div>
              <p className="text-gray-600 mt-1">{r.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(r.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Metadata</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <b>Barcode</b>
            <Barcode value={product.meta?.barcode || "000000000000"} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {related.slice(0, 6).map((p: any) => (
            <div
              key={p.id}
              onClick={() => (window.location.href = `/inventory/${p.id}`)}
              className="border rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer bg-white overflow-hidden"
            >
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={p.thumbnail}
                  className="max-w-full max-h-full object-contain p-2"
                  alt={p.title}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                <p className="text-gray-500">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
