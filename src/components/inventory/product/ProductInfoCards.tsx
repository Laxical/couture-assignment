export default function ProductInfoCards({ product }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-t border-border/50">
      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-serif mb-6">Specifications</h3>
          <div className="grid grid-cols-2 gap-y-8 gap-x-12">
            <Info label="Brand Identity" value={product.brand} />
            <Info label="Inventory SKU" value={product.sku} />
            <Info label="Customer Rating" value={`${product.rating} / 5.0`} />
            <Info
              label="Minimum Order"
              value={`${product.minimumOrderQuantity} units`}
            />
          </div>
        </div>

        {product.dimensions && (
          <div className="p-8 bg-[#F9F8F6] rounded-2xl border border-border/30">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Physical Dimensions
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <Info label="Width" value={`${product.dimensions.width}mm`} />
              <Info label="Height" value={`${product.dimensions.height}mm`} />
              <Info label="Depth" value={`${product.dimensions.depth}mm`} />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-serif mb-6">Commitments</h3>
        <div className="grid gap-6">
          <Block
            title="Warranty Assurance"
            value={product.warrantyInformation}
          />
          <Block title="Global Logistics" value={product.shippingInformation} />
          <Block title="Returns & Exchange" value={product.returnPolicy} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">
        {label}
      </p>
      <p className="text-base font-medium text-foreground">{value || "—"}</p>
    </div>
  );
}

function Block({ title, value }: any) {
  return (
    <div className="p-6 border border-border/50 rounded-xl hover:bg-muted/30 transition-colors">
      <p className="text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase mb-2">
        {title}
      </p>
      <p className="text-foreground leading-relaxed">{value}</p>
    </div>
  );
}
