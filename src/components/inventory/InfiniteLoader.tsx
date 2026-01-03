import { ForwardedRef, forwardRef } from "react";

interface Props {
  loading: boolean;
}

const PLACEHOLDERS = 8; // 2 rows (4 per row in large grid)

const InfiniteLoader = forwardRef(function Loader(
  { loading }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  if (!loading)
    return <div ref={ref} className="h-6" />;

  return (
    <div ref={ref} className="w-full mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: PLACEHOLDERS }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border shadow-sm bg-white overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200" />

            <div className="p-4 space-y-3">
              <div className="w-24 h-5 bg-gray-200 rounded-full" />

              <div className="w-3/4 h-5 bg-gray-200 rounded" />
              <div className="w-2/3 h-5 bg-gray-200 rounded" />

              <div className="flex justify-between mt-4">
                <div className="w-16 h-5 bg-gray-200 rounded" />
                <div className="w-12 h-5 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default InfiniteLoader;
