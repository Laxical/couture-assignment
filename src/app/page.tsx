import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-background via-muted/10 to-muted/40">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto text-center mb-14 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="inline-block p-5 bg-primary/10 rounded-3xl border border-primary/30 shadow-sm">
            <svg
              className="w-14 h-14 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9h18v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path d="M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2" />
              <path
                d="M9 13h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Welcome to Store Portal
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Start exploring products effortlessly. Choose a category or dive
          straight into the full product list.
        </p>
      </section>

      {/* CTA Cards */}
      <section className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* Browse by Category */}
        <Link href="/inventory/categories" className="group">
          <div className="h-full p-8 bg-card border border-border rounded-2xl hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary/20 transition-all">
              <svg
                className="w-7 h-7 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 9h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z" />
                <path d="M3 9V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
            <p className="text-muted-foreground mb-6">
              Select a category to explore products in a structured and
              organized manner.
            </p>

            <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              View Categories →
            </span>
          </div>
        </Link>

        {/* Browse All Products */}
        <Link href="/inventory" className="group">
          <div className="h-full p-8 bg-card border border-border rounded-2xl hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-6 group-hover:bg-accent/20 transition-all">
              <svg
                className="w-7 h-7 text-accent"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M8 11h8M8 15h5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-2">Browse All Products</h2>
            <p className="text-muted-foreground mb-6">
              Select a product directly to explore the complete product
              portfolio instantly.
            </p>

            <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
              Explore Products →
            </span>
          </div>
        </Link>
      </section>
    </main>
  );
}
