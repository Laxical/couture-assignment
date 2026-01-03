import JsBarcode from "jsbarcode";
import { useRef, useEffect } from "react";

export default function Barcode({ value }: { value: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128", // or "CODE128"
        displayValue: true,
        fontSize: 16,
        height: 80,
        lineColor: "#000",
      });
    }
  }, [value]);

  return <svg ref={svgRef}></svg>;
}
