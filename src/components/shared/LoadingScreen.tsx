"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({
  isVisible = true,
}: {
  isVisible?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(isVisible);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Syncing inventory data…",
    "Validating stock integrity…",
    "Optimizing product catalog…",
    "Aggregating marketplace analytics…",
    "Finalizing dashboard experience…",
  ];

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Simulated progress engine
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + Math.random() * 8;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Message rotator
  useEffect(() => {
    if (!isVisible) return;

    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 1800);

    return () => clearInterval(msgInterval);
  }, [isVisible]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative w-24 h-24 mb-8">
        {/* Box container */}
        <div className="absolute inset-0 animate-box-bounce">
          {/* Main box */}
          <div
            className="w-full h-full bg-primary/80 rounded-lg shadow-xl"
            style={{ perspective: "1000px" }}
          >
            {/* Box flap */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-primary rounded-t-lg origin-top flex items-center justify-center">
              <div className="w-2 h-6 bg-accent rounded-full" />
            </div>
            {/* Box body */}
            <div className="absolute inset-0 top-1/3 bg-primary/70 rounded-b-lg border-2 border-primary flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2">
                <div className="w-2 h-2 bg-accent/60 rounded-full" />
                <div className="w-2 h-2 bg-accent/60 rounded-full" />
                <div className="w-2 h-2 bg-accent/60 rounded-full" />
                <div className="w-2 h-2 bg-accent/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Particles around box */}
        <div
          className="absolute -left-6 top-1/4 w-1 h-1 bg-accent rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute -right-6 top-1/3 w-1 h-1 bg-accent rounded-full animate-float"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute -left-8 bottom-1/4 w-1 h-1 bg-accent rounded-full animate-float"
          style={{ animationDelay: "0.6s" }}
        />
        <div
          className="absolute -right-8 bottom-1/3 w-1 h-1 bg-accent rounded-full animate-float"
          style={{ animationDelay: "0.9s" }}
        />
      </div>

      {/* Headline */}
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Preparing Your Page
      </h2>

      {/* Dynamic Message */}
      <p className="text-foreground/60 mb-6 h-6 transition-opacity duration-300">
        {messages[messageIndex]}
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-border rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%] rounded-full transition-all"
          style={{
            width: `${Math.min(progress, 100)}%`,
            animation: "shimmer 2s infinite",
          }}
        />
      </div>

      {/* Percentage */}
      <p className="text-sm text-muted-foreground font-semibold tracking-wide">
        {Math.min(Math.floor(progress), 100)}%
      </p>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
