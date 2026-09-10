import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductCard } from "@/hooks/useProductCard";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/rest/wix-store-catalog";

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart();
  const [resolving, setResolving] = useState(false);
  const {
    isSoldOut, leftBadges, promoBadge, priceDisplay, compareAtDisplay,
    colors, optionLabel, isQuickAddable, hasOptions, image,
  } = useProductCard(product);

  const busy = loading || resolving;

  const quickAdd = async (e) => {
    e.preventDefault();
    if (busy || isSoldOut) return;
    if (isQuickAddable) {
      addToCart(product.id);
      return;
    }
    // Has real variants (finish, chain, …) — the search result doesn't carry variant ids,
    // so resolve the first in-stock one instead of forcing every visit through the PDP.
    setResolving(true);
    try {
      const full = await getProductBySlug(product.slug);
      const variants = full?.variantsInfo?.variants || [];
      const variant = variants.find((v) => v.inventoryStatus?.inStock) || variants[0];
      if (variant) addToCart(product.id, variant.id);
    } finally {
      setResolving(false);
    }
  };

  const showQuickAdd = !isSoldOut && (isQuickAddable || hasOptions);

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-xs">AUREVA</div>
        )}
        {promoBadge && (
          <span className="absolute top-3 left-3 text-[10px] tracking-wide-sm uppercase bg-foreground text-background px-2.5 py-1">{promoBadge.label}</span>
        )}
        {showQuickAdd && (
          <button onClick={quickAdd} disabled={busy}
            className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-[11px] tracking-wide-sm uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-60">
            {resolving ? "Adding…" : "Quick Add"}
          </button>
        )}
        {product.metafields?.aureva?.bundles && product.metafields.aureva.bundles.enabled && (
          <span className="absolute top-3 right-3 text-[8px] tracking-wide-sm uppercase bg-foreground/20 text-foreground/60 px-2 py-1 rounded-badge">
            Bundle available
          </span>
        )}
      </div>
      <div className="pt-3">
        <h3 className="font-display text-lg leading-snug text-foreground">{product.name}</h3>
        {optionLabel && <p className="text-[11px] text-muted-foreground mt-1">{optionLabel}</p>}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-foreground">{priceDisplay}</span>
          {compareAtDisplay && <span className="text-xs text-muted-foreground line-through">{compareAtDisplay}</span>}
        </div>
        {colors?.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {colors.slice(0, 3).map((c, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full border hairline" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
