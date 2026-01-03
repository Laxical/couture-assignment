import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="w-full max-w-4xl mx-auto text-center mb-12 animate-fade-in">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-2xl border border-primary/20">
            <svg
              className="w-12 h-12 text-primary"
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

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
          Store Portal
        </h1>
      </div>

      {/* CTA Cards */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 mb-12">
        {/* Inventory Card */}
        <Link href="/inventory" className="group">
          <div className="h-full p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary/20 transition-colors">
              <svg
                className="w-7 h-7 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              Inventory Overview
            </h2>
            <p className="text-muted-foreground mb-6">
              Track real-time stock levels, view product details, and manage
              your inventory with precision.
            </p>

            {/* Arrow */}
            <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Explore <span className="text-lg">→</span>
            </div>
          </div>
        </Link>

        {/* Catalogue Card */}
        <Link href="/inventory/categories" className="group">
          <div className="h-full p-8 bg-card border border-border rounded-2xl hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-6 group-hover:bg-accent/20 transition-colors">
              <svg
                className="w-7 h-7 text-accent"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 9h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z" />
                <path d="M3 9V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v2" />
                <circle cx="9" cy="17" r="1.5" fill="currentColor" />
                <circle cx="15" cy="17" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              Catalogue Overview
            </h2>
            <p className="text-muted-foreground mb-6">
              Browse product categories, discover new items, and gain insights
              into your entire catalog.
            </p>

            {/* Arrow */}
            <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
              Browse <span className="text-lg">→</span>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
