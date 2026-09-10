import { Link } from "react-router-dom";
import { useProductImage } from "@/hooks/useProductImage";
import { useBundlePricing } from "@/components/BundleOptions";

const HERO_SLUG = "build-your-story-charm-necklace";

// Maps to bundleOptions[1..3] from useBundlePricing (quantity 2/3/4 — index 0 is a single
// unit at regular price, not worth promoting as a "save more" tier).
const TIERS = [
  { bundleIndex: 1, name: "Start Your Story", note: "Perfect for you and someone you love.", featured: false },
  { bundleIndex: 2, name: "Build Your Story", note: "Most Loved", featured: true },
  { bundleIndex: 3, name: "The Full Story", note: "Maximum savings for gifting your whole circle.", featured: false },
];

export default function Bundles() {
  const { product } = useProductImage(HERO_SLUG);
  const { bundleOptions } = useBundlePricing(product);

  return (
    <section className="py-20 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-5">Save More</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground">Build more. Save more.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-8 items-stretch">
          {TIERS.map((t) => {
            const option = bundleOptions[t.bundleIndex];
            return (
              <div
                key={t.name}
                className={`relative flex flex-col p-8 lg:p-10 text-center transition-colors ${
                  t.featured ? "bg-background shadow-luxe border hairline md:scale-[1.04] z-10" : "bg-background/60 border hairline"
                }`}
              >
                {t.featured && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-luxe uppercase bg-foreground text-background px-5 py-2">
                    Most Loved
                  </span>
                )}
                <h3 className="font-display text-2xl font-normal text-foreground mt-3">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-3">
                  {option ? `Buy ${option.quantity}, Save ${option.discount}%` : " "}
                </p>
                {option && (
                  <p className="mt-2 flex items-baseline justify-center gap-2">
                    <span className="text-lg text-foreground">{option.finalTotal}</span>
                    <span className="text-xs text-muted-foreground line-through">{option.baseTotal}</span>
                  </p>
                )}
                <p className="text-[11px] tracking-wide-sm uppercase text-foreground/60 mt-6">{t.note}</p>
                <Link
                  to={`/product/${HERO_SLUG}?bundle=${t.bundleIndex}`}
                  className={`mt-8 text-[11px] tracking-wide-sm uppercase py-3.5 transition-colors ${t.featured ? "bg-foreground text-background hover:bg-foreground/85" : "border hairline text-foreground hover:bg-secondary"}`}
                >
                  Choose this
                </Link>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-10 text-[11px] tracking-wide-sm uppercase text-muted-foreground">
          The more you add, the more you save — up to 40% off
        </p>
      </div>
    </section>
  );
}
