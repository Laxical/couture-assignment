"use client";

import JsBarcode from "jsbarcode";
import { useRef, useEffect } from "react";

export default function Barcode({ value }: { value: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        displayValue: true,
        fontSize: 14,
        height: 60,
        lineColor: "#0d9488",
        margin: 8,
      });
    }
  }, [value]);

  return (
    <div className="flex justify-center bg-white p-4 rounded-lg border border-border">
      <svg ref={svgRef}></svg>
    </div>
  );
}
