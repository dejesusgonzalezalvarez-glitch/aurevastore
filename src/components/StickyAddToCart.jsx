import { useEffect, useState } from "react";
import { productImage } from "@/lib/storeImage";

// Slim sticky buy bar for mobile PDP: appears after scrolling past the main
// CTAs so buyers can add without scrolling back up. Mobile-only (lg:hidden),
// thumb-reachable, and respects the iPhone home indicator via safe-area padding.
export default function StickyAddToCart({ product, price, canAdd, adding, onAdd }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product || !visible) return null;
  const image = productImage(product);

  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t hairline bg-background/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 px-5 py-3">
        {image && <img src={image} alt="" loading="lazy" className="w-11 h-11 object-cover shrink-0" />}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground truncate">{product.name}</p>
          {price && <p className="text-sm text-muted-foreground">{price}</p>}
        </div>
        <button
          onClick={onAdd}
          disabled={!canAdd || adding}
          className="shrink-0 min-h-[44px] px-6 text-[11px] tracking-wide-sm uppercase bg-foreground text-background hover:bg-foreground/85 transition-colors disabled:opacity-50"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </div>
    </div>
  );
}