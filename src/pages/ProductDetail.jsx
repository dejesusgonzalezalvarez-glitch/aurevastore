import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useVariantOptions } from "@/hooks/useVariantOptions";
import { productGallery, productImage } from "@/lib/storeImage";
import { useCart } from "@/context/CartContext";
import { useBundlePricing, BundleOptions } from "@/components/BundleOptions";
import { Seo, productSchema, breadcrumbSchema, currencyCode, truncate } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProducts from "@/components/RelatedProducts";
import StickyAddToCart from "@/components/StickyAddToCart";

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
  const [selectedBundleIndex, setSelectedBundleIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
    <div className="mx-auto max-w-7xl px-5 py-32">
      <div className="space-y-4">
        <div className="h-8 bg-secondary animate-pulse w-full" />
        <div className="h-4 bg-secondary animate-pulse w-full" />
        <div className="h-32 bg-secondary animate-pulse w-full" />
      </div>
    </div>
  );

  const images = productGallery(d.product);
  const gallery = images.length ? images : (d.focusMediaUrl ? [{ url: d.focusMediaUrl, altText: d.product.name }] : []);
  const focus = d.focusMediaUrl || gallery[activeImg]?.url || gallery[0]?.url;

  const ogImage = focus || productImage(d.product);
  const seoTitle = `${d.product.name} | AUREVA`;
  const seoDescription = truncate(d.product.plainDescription, 155) ||
    "A personalized piece by AUREVA made to represent the people, memories and moments that matter most.";
  const seoPrice = d.variant?.price?.actualPrice?.amount ?? d.product?.actualPriceRange?.minValue?.amount ?? "";
  const seoCurrency = d.variant?.price?.actualPrice?.currency || d.product?.currency || currencyCode(d.price);

  const { bundleOptions, unitPrice } = useBundlePricing(d.product);

  async function buyNow() {
    if (!d.product || !d.canAdd || d.adding || cartLoading) return;
    const result = await d.submit();
    if (result === null) return;
    await checkout();
  }

  async function addBundleToCart(bundleIndex) {
    const selected = bundleOptions[bundleIndex];
    const qty = selected.quantity;
    if (!d.product || !d.canAdd) return;

    setSelectedBundleIndex(bundleIndex);
    setQuantity(qty);

    try {
      await d.addToCart(d.product.id, d.variant?.id, qty, {
        modifierChoices: Object.keys(d.modifierChoices || {}).length ? d.modifierChoices : undefined,
        customTextFields: Object.keys(d.customTextFields || {}).length ? d.customTextFields : undefined,
      });
    } catch (e) {
      console.error("Error adding bundle to cart:", e);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:py-16">
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/product/${slug}`}
        ogImage={ogImage}
        ogType="product"
        jsonLd={[
          productSchema({
            name: d.product.name,
            image: ogImage,
            description: d.product.plainDescription,
            url: `/product/${slug}`,
            price: seoPrice,
            priceCurrency: seoCurrency,
            availability: d.inStock ? "IN_STOCK" : "OUT_OF_STOCK",
            sku: d.variant?.sku || d.product?.sku,
            brand: "AUREVA",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: d.product.name },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: d.product.name },
        ]}
      />

      <div className="space-y-8">
        {/* 1. Galería / imagen del producto */}
        <div>
          <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
            {focus ? (
              <img src={focus} alt={`${d.product.name} — personalized jewelry by AUREVA`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 font-display text-2xl">AUREVA</div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-20 shrink-0 overflow-hidden border ${focus === g.url ? "border-foreground" : "hairline"}`}>
                  <img src={g.url} alt={g.altText} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Nombre */}
        <div>
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-3">Build Your Story™</p>
          <h1 className="font-display text-2xl lg:text-3xl font-light text-foreground leading-tight">{d.product.name}</h1>
        </div>

        {/* 3. Precio */}
        <div className="mt-3">
          <div className="flex items-center gap-3">
            <span className="text-xl text-foreground">{d.price}</span>
            {d.compareAtPrice && <span className="text-base text-muted-foreground line-through">{d.compareAtPrice}</span>}
          </div>
        </div>

        {/* 4. Valoración, si existen datos reales */}
        {d.product.plainDescription && (
          <p className="mt-2 text-[15px] text-foreground font-light italic">
            A piece made for the people, moments and memories you never want to forget.
          </p>
        )}

        {/* 5. Propuesta de valor */}
        {d.options.length > 0 && !d.variant && (
          <p className="mt-3 text-sm text-muted-foreground">Please select your options to continue.</p>
        )}

        {/* 6. Variantes */}
        {optionGroups.map((g) => (
          <div key={g.id} className="mt-6">
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
                  {c.isColorSwatch && c.colorCode && <span className="w-3 h-3 rounded-full border hairline" style={{ backgroundColor: c.colorCode }} />}
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* 7. Personalización, si corresponde */}
        {modifierGroups.map((m) => (
          <div key={m.key} className="mt-6">
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

{/* 3.5. Opciones de Bundle */}
        {bundleOptions && bundleOptions.length > 0 && (
          <BundleOptions
            product={d.product}
            onSelect={index => setSelectedBundleIndex(index)}
            selectedIndex={selectedBundleIndex}
          />
        )}

        {/* 4. Valoración, si existen datos reales */}
        {d.product.plainDescription && (
          <p className="mt-2 text-[15px] text-foreground font-light italic">
            A piece made for the people, moments and memories you never want to forget.
          </p>
        )}

        {/* 8. CTA "AÑADIR AL CARRITO" */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                if (bundleOptions && bundleOptions.length > 0) {
                  addBundleToCart(selectedBundleIndex);
                } else {
                  d.submit();
                }
              }}
              disabled={!d.canAdd || d.adding}
              className="flex-1 text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-3 px-4 hover:bg-foreground/85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {d.adding ? "Adding…" : "Add to Cart"}
            </button>
            <button
              onClick={buyNow}
              disabled={!d.canAdd || d.adding || cartLoading}
              className="flex-1 text-[11px] tracking-wide-sm uppercase border hairline text-foreground py-3 px-4 hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cartLoading ? "Working…" : "Buy Now"}
            </button>
          </div>
        </div>

        {/* 9. Información de envío y beneficios */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] tracking-wide-sm uppercase text-muted-foreground border hairline p-4">
          <span>✓ Secure Checkout</span>
          <span>✓ Easy Returns</span>
          <span>✓ Selected Materials</span>
          <span>✓ Track Your Order</span>
        </div>

        {/* 10. Descripción */}
        {d.product.plainDescription && (
          <p className="mt-4 text-[13px] text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: d.product.plainDescription }} />
        )}

        {/* 11. Productos relacionados */}
        <RelatedProducts product={d.product} />
      </div>

      <StickyAddToCart
        product={d.product}
        price={d.price}
        canAdd={d.canAdd}
        adding={d.adding}
        onAdd={() => d.submit()}
      />
    </div>
  );
}