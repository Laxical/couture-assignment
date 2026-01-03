"use client";

import Barcode from "../../inventory/BarCode";

export default function ProductBarcode({ product }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Product Details</h2>

      <div className="border border-border rounded-lg p-6 bg-card">
        <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase">
          Barcode
        </p>

        <div className="p-4 bg-muted rounded-lg flex justify-center">
          <Barcode value={product.meta?.barcode || "000000000000"} />
        </div>
      </div>
    </div>
  );
}
