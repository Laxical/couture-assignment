"use client";

export default function ProductInfoCards({ product }: any) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg border border-border">
        <Info label="Brand" value={product.brand} />
        <Info label="SKU" value={product.sku} />
        <Info label="Rating" value={`⭐ ${product.rating}`} />
        <Info
          label="Min Order"
          value={`${product.minimumOrderQuantity} units`}
        />
      </div>

      <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
        <Block title="Warranty" value={product.warrantyInformation} />
        <Block title="Shipping" value={product.shippingInformation} />
        <Block title="Returns" value={product.returnPolicy} />
      </div>

      {product.dimensions && (
        <div className="space-y-3 p-4 bg-muted border border-border rounded-lg">
          <h3 className="font-semibold">Dimensions</h3>
          <div className="grid grid-cols-3 text-sm gap-3">
            <Info label="Width" value={product.dimensions.width} />
            <Info label="Height" value={product.dimensions.height} />
            <Info label="Depth" value={product.dimensions.depth} />
          </div>
        </div>
      )}
    </>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Block({ title, value }: any) {
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground uppercase">
        {title}
      </p>
      <p>{value}</p>
    </div>
  );
}
