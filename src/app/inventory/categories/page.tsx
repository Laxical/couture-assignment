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

  if (loading) return <div className="p-6">Loading categories...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Catalogue – Category Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.slug}
            onClick={() =>
              (window.location.href = `/inventory?category=${c.slug}`)
            }
            className="border rounded-xl shadow-sm hover:shadow-xl transition cursor-pointer bg-white overflow-hidden"
          >
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <img
                src={c.image}
                className="max-w-full max-h-full object-contain p-2"
              />
            </div>

            <div className="p-4 text-center">
              <h2 className="font-semibold text-lg">{c.name}</h2>
              <p className="text-gray-500 text-sm mt-1">View products →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
