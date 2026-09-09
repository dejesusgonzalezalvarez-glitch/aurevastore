import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const HERO_SLUG = "build-your-story-charm-necklace";
const HERO_IMG = "https://media.db.com/images/public/6aa02f3f8ca31c6d03cd120c/fce66525f_generated_4bfa8196.jpg";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5">
        <div className="animate-fade-up">
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">Build Your Story™</p>
          <h1 className="font-display text-2xl lg:text-3xl font-light leading-[1.1] text-foreground text-balance">
            Personalized jewelry that<br /><span className="italic">tells your story.</span>
          </h1>
          <p className="mt-5 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-sm">
            Create a necklace that represents the people, memories and moments that matter most to you.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Link to={`/product/${HERO_SLUG}`} className="flex-1 text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-3 px-4 hover:bg-foreground/85 transition-colors">
              Build Your Story
            </Link>
            <Link to="/shop" className="flex-1 text-[11px] tracking-wide-sm uppercase border hairline text-foreground py-3 px-4 hover:bg-secondary transition-colors">
              Shop the Collection
            </Link>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
            <Image src={HERO_IMG} alt="Woman wearing the AUREVA Build Your Story charm necklace" fittingType="fill" className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="border-y hairline mt-8">
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-4 divide-x divide-y md:divide-y-0 hairline">
          {[
            "Secure Checkout",
            "Easy Returns",
            "Carefully Selected Materials",
            "Track Your Order",
          ].map((t) => (
            <div key={t} className="flex items-center justify-center gap-2 py-3 text-[11px] tracking-wide-sm uppercase text-muted-foreground text-center">
              <span className="text-foreground">✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}