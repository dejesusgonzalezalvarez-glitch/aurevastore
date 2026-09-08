const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const HERO_SLUG = "build-your-story-charm-necklace";
const HERO_IMG = "https://media.db.com/images/public/6aa02f3f8ca31c6d03cd120c/fce66525f_generated_4bfa8196.jpg";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-0 lg:gap-16 items-center min-h-[88vh] lg:min-h-[92vh] py-10 lg:py-0">
        <div className="order-2 lg:order-1 max-w-xl animate-fade-up">
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-6">Build Your Story™ Charm Necklace</p>
          <h1 className="font-display text-[2.5rem] sm:text-6xl lg:text-7xl font-light leading-[1.05] text-foreground text-balance">
            More than jewelry.<br /><span className="italic">Your story.</span>
          </h1>
          <p className="mt-7 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
            Create a necklace that represents the people, memories and moments that matter most to you.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to={`/product/${HERO_SLUG}`} className="text-[11px] tracking-wide-sm uppercase bg-foreground text-background px-8 py-4 text-center hover:bg-foreground/85 transition-colors">
              Build Your Story
            </Link>
            <Link to="/shop" className="text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-8 py-4 text-center hover:bg-secondary transition-colors">
              Shop the Collection
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="aspect-[4/5] lg:aspect-[4/5] w-full overflow-hidden bg-secondary">
            <Image src={HERO_IMG} alt="Woman wearing the AUREVA Build Your Story charm necklace" fittingType="fill" className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="border-y hairline">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 hairline">
          {[
            "Secure Checkout",
            "Easy Returns",
            "Carefully Selected Materials",
            "Track Your Order",
          ].map((t) => (
            <div key={t} className="flex items-center justify-center gap-2 py-5 text-[11px] tracking-wide-sm uppercase text-muted-foreground text-center">
              <span className="text-foreground">✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}