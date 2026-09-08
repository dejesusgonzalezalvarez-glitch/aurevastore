import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useVariantOptions } from "@/hooks/useVariantOptions";
import { productGallery } from "@/lib/storeImage";
import { useCart } from "@/context/CartContext";

const HERO_SLUG = "build-your-story-charm-necklace";

const BUNDLES = [
  { name: "Start Your Story", detail: "1 Charm", featured: false },
  { name: "Build Your Story", detail: "3 Charms", featured: true },
  { name: "The Full Story", detail: "5 Charms", featured: false },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const d = useProductDetail(slug);
  const { optionGroups, modifierGroups } = useVariantOptions(d.options, d.modifiers, d.selectedOptions, d.modifierValues);
  const { checkout, loading: cartLoading } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  if (d.error) return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <p className="font-display text-3xl text-foreground">{d.error}</p>
      <button onClick={d.retry} className="mt-6 text-[11px] tracking-wide-sm uppercase border hairline px-6 py-3 hover:bg-secondary">Try again</button>
    </div>
  );
  if (d.notFound) return (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <p className="font-display text-3xl text-foreground">This piece couldn't be found.</p>
      <Link to="/shop" className="mt-6 inline-block text-[11px] tracking-wide-sm uppercase border hairline px-6 py-3 hover:bg-secondary">Back to shop</Link>
    </div>
  );
  if (!d.product) return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-32">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-secondary animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-secondary animate-pulse w-3/4" />
          <div className="h-4 bg-secondary animate-pulse w-1/3" />
          <div className="h-32 bg-secondary animate-pulse" />
        </div>
      </div>
    </div>
  );

  const images = productGallery(d.product);
  const gallery = images.length ? images : (d.focusMediaUrl ? [{ url: d.focusMediaUrl, altText: d.product.name }] : []);
  const focus = d.focusMediaUrl || gallery[activeImg]?.url || gallery[0]?.url;

  async function buyNow() {
    if (!d.product || !d.canAdd || d.adding || cartLoading) return;
    const result = await d.submit();
    if (result === null) return;
    await checkout();
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="aspect-square bg-secondary overflow-hidden">
            {focus ? (
              <img src={focus} alt={d.product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 font-display text-2xl">AUREVA</div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 shrink-0 overflow-hidden border ${focus === g.url ? "border-foreground" : "hairline"}`}>
                  <img src={g.url} alt={g.altText} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-3">Build Your Story™</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-foreground leading-tight">{d.product.name}</h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xl text-foreground">{d.price}</span>
            {d.compareAtPrice && <span className="text-base text-muted-foreground line-through">{d.compareAtPrice}</span>}
          </div>

          {d.product.plainDescription && (
            <div className="mt-6 text-muted-foreground leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: d.product.plainDescription }} />
          )}
          <p className="mt-4 text-[15px] text-foreground font-light italic">
            A piece made for the people, moments and memories you never want to forget.
          </p>

          {/* Options */}
          {optionGroups.map((g) => (
            <div key={g.id} className="mt-8">
              <h3 className="text-[11px] tracking-wide-sm uppercase text-foreground mb-4">{g.name}</h3>
              <div className="flex flex-wrap gap-3">
                {g.choices.map((c) => (
                  <button
                    key={c.choiceId}
                    disabled={!c.inStock}
                    onClick={() => d.selectOption(g.id, c.choiceId)}
                    className={`flex items-center gap-2 px-4 py-3 border text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      c.selected ? "border-foreground bg-foreground text-background" : "hairline hover:bg-secondary"
                    }`}
                  >
                    {c.isColorSwatch && c.colorCode && <span className="w-4 h-4 rounded-full border hairline" style={{ backgroundColor: c.colorCode }} />}
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Modifiers */}
          {modifierGroups.map((m) => (
            <div key={m.key} className="mt-8">
              <h3 className="text-[11px] tracking-wide-sm uppercase text-foreground mb-4">
                {m.name}{m.mandatory && <span className="text-muted-foreground normal-case tracking-normal ml-1">· required</span>}
              </h3>
              {m.type === "text" ? (
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => d.setModifier(m.key, e.target.value)}
                  placeholder="Enter your text"
                  className="w-full border-b hairline focus:border-foreground py-3 text-sm outline-none transition-colors"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {m.choices.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => d.setModifier(m.key, c.key)}
                      className={`px-4 py-3 border text-sm transition-colors ${c.selected ? "border-foreground bg-foreground text-background" : "hairline hover:bg-secondary"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="text-[11px] tracking-wide-sm uppercase text-foreground mb-4">Quantity</h3>
            <div className="inline-flex items-center border hairline">
              <button onClick={() => d.setQuantity(Math.max(1, Number(d.quantity) - 1))} className="w-11 h-11 text-foreground hover:bg-secondary" aria-label="Decrease">−</button>
              <span className="w-12 text-center text-sm">{d.quantity}</span>
              <button onClick={() => d.setQuantity(Number(d.quantity) + 1)} className="w-11 h-11 text-foreground hover:bg-secondary" aria-label="Increase">+</button>
            </div>
          </div>

          {/* Selection hint */}
          {d.options.length > 0 && !d.variant && (
            <p className="mt-6 text-sm text-muted-foreground">Please select your options to continue.</p>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => d.submit()}
              disabled={!d.canAdd || d.adding}
              className="flex-1 text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-4 hover:bg-foreground/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {d.adding ? "Adding…" : "Add to Cart"}
            </button>
            <button
              onClick={buyNow}
              disabled={!d.canAdd || d.adding || cartLoading}
              className="flex-1 text-[11px] tracking-wide-sm uppercase border hairline text-foreground py-4 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cartLoading ? "Working…" : "Buy Now"}
            </button>
          </div>

          {/* Trust */}
          <div className="mt-8 grid grid-cols-2 gap-3 text-[11px] tracking-wide-sm uppercase text-muted-foreground border hairline p-5">
            <span>✓ Secure Checkout</span>
            <span>✓ Easy Returns</span>
            <span>✓ Selected Materials</span>
            <span>✓ Track Your Order</span>
          </div>

          {/* Bundles */}
          <div className="mt-12">
            <h3 className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-2">Save more with more charms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
              {BUNDLES.map((b) => (
                <div key={b.name} className={`relative p-5 text-center border ${b.featured ? "border-foreground bg-secondary" : "hairline"}`}>
                  {b.featured && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] tracking-luxe uppercase bg-foreground text-background px-3 py-1">Most Loved</span>}
                  <p className="font-display text-lg text-foreground mt-1">{b.name}</p>
                  <p className="text-[11px] tracking-wide-sm uppercase text-muted-foreground mt-2">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upsell */}
      <div className="mt-20 sm:mt-28 border-t hairline pt-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground">Complete Your Story</h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">Add another charm and make it even more personal.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="text-[11px] tracking-wide-sm uppercase bg-foreground text-background px-8 py-4 hover:bg-foreground/85 transition-colors">Shop Charms</Link>
          <Link to={`/product/${HERO_SLUG}`} className="text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-8 py-4 hover:bg-secondary transition-colors">Keep Building</Link>
        </div>
      </div>
    </div>
  );
}