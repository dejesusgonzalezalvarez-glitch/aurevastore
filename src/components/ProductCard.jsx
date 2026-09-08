import { Link } from "react-router-dom";
import { useProductCard } from "@/hooks/useProductCard";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart();
  const {
    isSoldOut, leftBadges, promoBadge, priceDisplay, compareAtDisplay,
    colors, optionLabel, isQuickAddable, image, hoverImage,
  } = useProductCard(product);

  const quickAdd = (e) => {
    e.preventDefault();
    if (isQuickAddable && !loading) addToCart(product.id);
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-secondary overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-xs">AUREVA</div>
        )}
        {hoverImage && (
          <img src={hoverImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {leftBadges.map((b) => (
            <span key={b.type} className="text-[10px] tracking-wide-sm uppercase bg-background/95 text-foreground px-2.5 py-1">{b.label}</span>
          ))}
        </div>
        {promoBadge && (
          <span className="absolute top-3 right-3 text-[10px] tracking-wide-sm uppercase bg-foreground text-background px-2.5 py-1">{promoBadge.label}</span>
        )}
        {isQuickAddable && !isSoldOut && (
          <button onClick={quickAdd} disabled={loading}
            className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-[11px] tracking-wide-sm uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-60">
            Quick Add
          </button>
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display text-lg leading-snug text-foreground">{product.name}</h3>
        {optionLabel && <p className="text-[11px] text-muted-foreground mt-1">{optionLabel}</p>}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-foreground">{priceDisplay}</span>
          {compareAtDisplay && <span className="text-xs text-muted-foreground line-through">{compareAtDisplay}</span>}
        </div>
        {colors?.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {colors.slice(0, 5).map((c, i) => (
              <span key={i} className="w-3 h-3 rounded-full border hairline" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}