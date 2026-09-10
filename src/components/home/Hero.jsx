import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useProductImage } from "@/hooks/useProductImage";

const HERO_SLUG = "build-your-story-charm-necklace";

export default function Hero() {
  const { product, image } = useProductImage(HERO_SLUG);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-10 lg:py-20">
        <div className="animate-fade-up order-2 lg:order-1">
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Build Your Story™</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] text-foreground text-balance">
            Personalized jewelry that<br /><span className="italic">tells your story.</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            Necklaces and charms designed around the people, memories and moments that matter most to you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to={`/product/${HERO_SLUG}`} className="flex-1 text-center text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-4 px-6 hover:bg-foreground/85 transition-colors">
              Build Your Story
            </Link>
            <Link to="/shop" className="flex-1 text-center text-[11px] tracking-wide-sm uppercase border hairline text-foreground py-4 px-6 hover:bg-secondary transition-colors">
              Shop the Collection
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2 aspect-[4/5] w-full overflow-hidden bg-secondary">
          {image ? (
            <Image
              src={image}
              alt={product?.name ? `${product.name} — personalized jewelry by AUREVA` : "AUREVA personalized charm necklace"}
              fittingType="fill"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full animate-pulse bg-secondary" />
          )}
        </div>
      </div>

      <div className="border-y hairline">
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-4 divide-x divide-y md:divide-y-0 hairline">
          {[
            "Secure Checkout",
            "Easy Returns",
            "Carefully Selected Materials",
            "Track Your Order",
          ].map((t) => (
            <div key={t} className="flex items-center justify-center py-3 px-2 text-[11px] tracking-wide-sm uppercase text-muted-foreground text-center">
              <span><span className="text-foreground">✓</span> {t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
