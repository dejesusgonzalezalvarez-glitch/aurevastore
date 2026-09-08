const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Image } from "@/components/ui/image";

const REFLECT_IMG = "https://media.db.com/images/public/6aa02f3f8ca31c6d03cd120c/fdd8ddaaf_generated_ef0cabd0.jpg";

const CONCEPTS = [
  { sym: "♥", label: "Someone you love." },
  { sym: "✦", label: "A moment you'll never forget." },
  { sym: "☾", label: "A memory." },
  { sym: "★", label: "A dream." },
  { sym: "◆", label: "Your family." },
];

export default function Storytelling() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/5] bg-secondary overflow-hidden">
              <Image src={REFLECT_IMG} alt="A woman reflecting while wearing her AUREVA necklace" fittingType="fill" className="w-full h-full" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-foreground">
              What would you carry with you?
            </h2>
            <div className="mt-10 space-y-5">
              {CONCEPTS.map((c) => (
                <div key={c.label} className="flex items-center gap-4 border-b hairline pb-5">
                  <span className="font-display text-2xl text-muted-foreground w-8 text-center">{c.sym}</span>
                  <span className="text-lg text-foreground font-light">{c.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 font-display text-2xl font-light italic text-foreground leading-relaxed">
              Your story is made of moments.<br />Now you can wear them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}