"use client";

import { useEffect, useState } from "react";
import { getCategories, fetchByCategory } from "@/lib/api";

interface CategoryCard {
  name: string;
  slug: string;
  image: string;
}

export default function CategoriesOverview() {
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();

        const withImages = await Promise.all(
          cats.map(async (c: any) => {
            const res = await fetchByCategory({
              category: c.slug,
              limit: 1,
              skip: 0,
            });

            return {
              name: c.name,
              slug: c.slug,
              image:
                res.products?.[0]?.thumbnail ||
                "https://via.placeholder.com/300x200?text=No+Image",
            };
          })
        );

        setCategories(withImages);
      } catch (err) {
        console.error("Failed loading categories", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-muted-foreground">
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Product Catalogue
        </h1>
        <p className="text-muted-foreground">
          Browse our complete collection of products by category
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.slug}
            onClick={() =>
              (window.location.href = `/inventory?category=${c.slug}`)
            }
            className="rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-card overflow-hidden hover:scale-105 transform"
          >
            <div className="w-full h-40 bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={c.image || "/placeholder.svg"}
                alt={c.name}
                className="max-w-full max-h-full object-contain p-3 hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-5 text-center border-t border-border">
              <h2 className="font-semibold text-lg text-foreground mb-1">
                {c.name}
              </h2>
              <p className="text-sm text-primary font-medium">
                View products →
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
