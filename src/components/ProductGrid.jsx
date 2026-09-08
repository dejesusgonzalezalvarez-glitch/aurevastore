import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products, loading, emptyMessage, emptyHint }) {
  if (loading && !products?.length) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-square bg-secondary animate-pulse" />
            <div className="h-4 bg-secondary mt-4 w-3/4 animate-pulse" />
            <div className="h-3 bg-secondary mt-2 w-1/3 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }
  if (!products?.length) {
    return emptyMessage ? (
      <div className="py-24 text-center">
        <p className="font-display text-2xl text-foreground">{emptyMessage}</p>
        <p className="text-sm text-muted-foreground mt-2">{emptyHint}</p>
      </div>
    ) : null;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}