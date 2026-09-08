import { useEffect, useState } from "react";
import { searchProducts } from "@/rest/wix-store-catalog";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({ product }) {
  const [items, setItems] = useState(null);
  const categoryId = product?.mainCategoryId;
  const productId = product?.id;

  useEffect(() => {
    let alive = true;
    setItems(null);
    if (!categoryId || !productId) return;
    searchProducts({ limit: 8, categoryId })
      .then(({ products }) => {
        if (!alive) return;
        setItems((products || []).filter((p) => p.id !== productId).slice(0, 4));
      })
      .catch(() => {
        if (alive) setItems([]);
      });
    return () => {
      alive = false;
    };
  }, [categoryId, productId]);

  if (!categoryId || !items || items.length === 0) return null;

  return (
    <section aria-label="Related products" className="mt-20 sm:mt-28 border-t hairline pt-16">
      <div className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground">You May Also Like</h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">Complete your story with pieces made to be layered and loved.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}