"use client";

import { type ForwardedRef, forwardRef } from "react";

interface Props {
  loading: boolean;
}

const PLACEHOLDERS = 8;

const InfiniteLoader = forwardRef(function Loader(
  { loading }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  if (!loading) return <div ref={ref} className="h-6" />;

  return (
    <div ref={ref} className="w-full mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: PLACEHOLDERS }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border shadow-sm bg-card overflow-hidden animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-muted" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              {/* Category Badge Skeleton */}
              <div className="w-20 h-5 bg-muted rounded-full" />

              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-muted rounded" />
                <div className="w-4/5 h-4 bg-muted rounded" />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="w-full h-3 bg-muted rounded" />
                <div className="w-3/4 h-3 bg-muted rounded" />
              </div>

              {/* Footer Skeleton */}
              <div className="flex justify-between pt-3 border-t border-border">
                <div className="w-16 h-4 bg-muted rounded" />
                <div className="w-12 h-4 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default InfiniteLoader;
