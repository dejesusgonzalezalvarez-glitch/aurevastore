import { useEffect, useState } from "react";
import { getProductBySlug } from "@/rest/wix-store-catalog";
import { productImage } from "@/lib/storeImage";

// Loads a real, live product photo by slug for editorial/marketing spots (hero,
// homepage storytelling) that don't have their own catalog data. Never a
// hardcoded external URL — those go stale the moment the asset host changes.
export function useProductImage(slug) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    getProductBySlug(slug)
      .then((p) => { if (alive) setProduct(p); })
      .catch(() => { /* leave null — caller renders a placeholder */ });
    return () => { alive = false; };
  }, [slug]);

  return { product, image: product ? productImage(product) : null };
}
