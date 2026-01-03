"use client";

export default function ProductReviews({ reviews }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Customer Reviews</h2>

      {!reviews?.length ? (
        <div className="p-8 text-center bg-muted border border-border rounded-lg">
          <p className="text-muted-foreground">No reviews yet</p>
        </div>
      ) : (
        reviews.map((r: any, i: number) => (
          <div
            key={i}
            className="border border-border rounded-lg p-5 bg-card hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <b>{r.reviewerName}</b>
              <span className="text-amber-600 font-semibold">
                ⭐ {r.rating}
              </span>
            </div>

            <p className="text-muted-foreground">{r.comment}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(r.date).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
