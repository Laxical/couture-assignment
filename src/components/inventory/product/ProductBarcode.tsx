"use client";

import Barcode from "../../inventory/BarCode";

export default function ProductBarcode({ product }: any) {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-serif mb-4 tracking-tight">
            Product Authentication
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every item in our inventory is tracked with a unique identifier to
            ensure authenticity and streamline logistics. Use this barcode for
            internal scanning and inventory verification.
          </p>
        </div>

        <div className="group relative flex-1 max-w-sm">
          <div className="absolute -inset-1 bg-gradient-to-r from-border to-transparent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mb-6 uppercase">
              Inventory Serial / Barcode
            </p>

            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-6">
                <Barcode value={product.meta?.barcode || "000000000000"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
