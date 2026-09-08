const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const HERO_SLUG = "build-your-story-charm-necklace";
const NECKLACE_IMG = "https://media.db.com/images/public/6aa02f3f8ca31c6d03cd120c/2cb5e78d0_generated_109c9ce7.jpg";
const CHARMS_IMG = "https://media.db.com/images/public/6aa02f3f8ca31c6d03cd120c/b64ca5191_generated_088ff942.jpg";

export default function WinnerProduct() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-5">Build Your Story™</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-foreground">
            One necklace.<br />A thousand meanings.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Choose the details that represent your life and create something that is uniquely yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div className="group relative aspect-[4/5] bg-secondary overflow-hidden">
            <Image src={NECKLACE_IMG} alt="Build Your Story charm necklace" fittingType="fill" className="w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 flex items-end justify-center pb-8">
              <span className="text-background text-[11px] tracking-wide-sm uppercase bg-foreground/85 px-5 py-2.5">The Chain</span>
            </div>
          </div>
          <div className="group relative aspect-[4/5] bg-secondary overflow-hidden">
            <Image src={CHARMS_IMG} alt="Collection of AUREVA charms" fittingType="fill" className="w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 flex items-end justify-center pb-8">
              <span className="text-background text-[11px] tracking-wide-sm uppercase bg-foreground/85 px-5 py-2.5">The Charms</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-14">
          <Link to={`/product/${HERO_SLUG}`} className="inline-block text-[11px] tracking-wide-sm uppercase bg-foreground text-background px-10 py-4 hover:bg-foreground/85 transition-colors">
            Create Yours
          </Link>
        </div>
      </div>
    </section>
  );
}