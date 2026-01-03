"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import LoadingScreen from "@/components/shared/LoadingScreen";
import { fetchByCategory } from "@/lib/api";

import ProductHero from "@/components/inventory/product/ProductHero";
import ProductInfoCards from "@/components/inventory/product/ProductInfoCards";
import ProductReviews from "@/components/inventory/product/ProductReviews";
import ProductBarcode from "@/components/inventory/product/ProductBarcode";
import ProductSimilar from "@/components/inventory/product/ProductSimilar";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState(null as any);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const productData = await fetch(
          `https://dummyjson.com/products/${params.id}`
        ).then((res) => res.json());

        setProduct(productData);

        const rel = await fetchByCategory({
          category: productData.category,
          limit: 7,
          skip: 0,
        });

        setRelated(rel.products.filter((p: any) => p.id !== productData.id));
      } catch (err) {
        console.error("Product load failed", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  if (loading) return <LoadingScreen />;
  if (!product) return <div className="p-6 text-center">Not Found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        <ProductHero product={product} />
        <ProductInfoCards product={product} />
        <ProductReviews reviews={product.reviews} />
        <ProductBarcode product={product} />
        <ProductSimilar related={related} />
      </div>
    </div>
  );
}
