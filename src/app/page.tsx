import Link from "next/link";
import {
  ArrowRight,
  LayoutGrid,
  Package,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-xs font-medium text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Inventory Experience
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 text-balance">
            Elevated Commerce,{" "}
            <span className="italic font-normal italic text-muted-foreground">
              Seamlessly
            </span>{" "}
            Managed
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 text-pretty">
            Discover a refined portal for exploring products and categories.
            Built with precision for the modern inventory experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link href="/inventory">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-primary/20 group"
              >
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/inventory/categories">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-semibold border-border/60 hover:bg-muted/50 bg-transparent"
              >
                View Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border/40">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Category Exploration Card */}
          <Link href="/inventory/categories" className="group block">
            <div className="relative h-full p-10 bg-card border border-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group-hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 text-muted-foreground/10 group-hover:text-primary/10 transition-colors">
                <LayoutGrid className="w-32 h-32 rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                  <LayoutGrid className="w-7 h-7" />
                </div>

                <h2 className="text-3xl font-serif mb-4 group-hover:text-primary transition-colors">
                  Curated Collections
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
                  Navigate through our structured inventory by category. Find
                  exactly what you need with intuitive organization.
                </p>

                <div className="flex items-center gap-2 text-sm font-bold tracking-tight uppercase text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Browse Categories <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Full Portfolio Card */}
          <Link href="/inventory" className="group block">
            <div className="relative h-full p-10 bg-card border border-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group-hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 text-muted-foreground/10 group-hover:text-primary/10 transition-colors">
                <Package className="w-32 h-32 -rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                  <Package className="w-7 h-7" />
                </div>

                <h2 className="text-3xl font-serif mb-4 group-hover:text-primary transition-colors">
                  Complete Portfolio
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
                  Access the full range of our offerings in one unified view.
                  Infinite scroll through our diverse product list.
                </p>

                <div className="flex items-center gap-2 text-sm font-bold tracking-tight uppercase text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Explore Everything <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
