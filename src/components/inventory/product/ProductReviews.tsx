"use client";

export default function ProductReviews({ reviews = [] }: any) {
  const hasReviews = reviews.length > 0;

  const averageRating = hasReviews
    ? (
        reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  return (
    <section className="py-16 border-t border-border/50">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-serif tracking-tight mb-4">
            Customer Experience
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Discover what our clients have to say about their acquisitions. We
            prioritize transparency and quality in every interaction.
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-5xl font-serif">{averageRating}</span>
            <span className="text-muted-foreground">
              Average rating • {reviews.length} reviews
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {!hasReviews ? (
            <div className="h-48 flex items-center justify-center bg-muted/30 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground font-light italic">
                Refining the first reviews...
              </p>
            </div>
          ) : (
            reviews.map((r: any, i: number) => (
              <div
                key={i}
                className="group p-8 bg-card border border-border rounded-2xl hover:shadow-sm transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {r.reviewerName}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-700 text-sm font-semibold">
                    <span>{r.rating}</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed font-light italic text-lg">
                  "{r.comment}"
                </p>
              </div>
            ))
          )}

          <button className="w-full py-4 text-sm font-bold tracking-widest uppercase border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300 mt-4">
            See All Experiences
          </button>
        </div>
      </div>
    </section>
  );
}
