"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, Package, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import DesktopSearch from "../header/DesktopSearch";
import MobileSearch from "../header/MobileSearch";
import MobileNav from "../header/MobileNav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/inventory", icon: Package },
    { name: "Categories", href: "/inventory/categories", icon: LayoutGrid },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 transition-all duration-300">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
                Inventory
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <DesktopSearch />

            <Link href="/inventory" className="hidden sm:flex">
              <Button
                variant="default"
                className="rounded-full px-6 font-semibold shadow-md shadow-primary/10"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-xl hover:bg-muted"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] p-0 border-l-0 shadow-2xl"
              >
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-6 border-b border-border/50 text-left">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-2xl font-bold tracking-tight">
                        Menu
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="p-6 space-y-8 overflow-y-auto flex-1">
                    <MobileSearch onNavigate={() => setIsSheetOpen(false)} />
                    <MobileNav navLinks={navLinks} />
                  </div>

                  <div className="p-6 border-t border-border/50">
                    <SheetClose asChild>
                      <Button className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/20">
                        Get Started
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
