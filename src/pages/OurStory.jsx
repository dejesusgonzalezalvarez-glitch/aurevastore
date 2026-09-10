import { Image } from "@/components/ui/image";
import { Seo } from "@/lib/seo";
import { useProductImage } from "@/hooks/useProductImage";

const ABOUT_SLUG = "initial-pendant-necklace";

export default function OurStory() {
  const about = useProductImage(ABOUT_SLUG);

  return (
    <div>
      <Seo
        title="Our Story — AUREVA | Jewelry With Meaning"
        description="The story behind AUREVA: why we create personalized jewelry designed to represent the people, memories and moments that matter most."
        canonicalPath="/our-story"
      />
      <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-secondary overflow-hidden">
        {about.image ? (
          <Image src={about.image} alt={about.product?.name || "AUREVA personalized jewelry"} fittingType="fill" className="w-full h-full" />
        ) : (
          <div className="w-full h-full animate-pulse bg-secondary" />
        )}
      </div>
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-28">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-5 text-center">Our Story</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground text-center leading-tight">
          Jewelry should mean something.
        </h1>
        <div className="mt-12 space-y-6 text-[17px] text-foreground/85 leading-relaxed font-light">
          <p>AUREVA was born from a simple idea.</p>
          <p>The important moments shouldn't live only in photographs. The people, memories and experiences that shape our lives deserve something more personal.</p>
          <p>That's why we create pieces designed to represent stories — charms and chains that carry what matters, close to you, every day.</p>
          <p className="font-display text-2xl italic text-foreground pt-4">Because every story deserves to be remembered.</p>
        </div>
      </div>
    </div>
  );
}