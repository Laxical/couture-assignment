"use client";

import Link from "next/link";
import { ChevronRight, User } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  return (
    <>
      <nav className="space-y-1">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 px-3 mb-3">
          Navigation
        </p>
        {navLinks.map((link) => (
          <SheetClose asChild key={link.name}>
            <Link
              href={link.href}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <link.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground/90">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </SheetClose>
        ))}
      </nav>

      <div className="space-y-1">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 px-3 mb-3">
          Account
        </p>
        <SheetClose asChild>
          <Link
            href="/login"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </div>
            <span className="font-semibold text-foreground/90">Sign In</span>
          </Link>
        </SheetClose>
      </div>
    </>
  );
}
