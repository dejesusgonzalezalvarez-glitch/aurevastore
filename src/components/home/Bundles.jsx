import { Link } from "react-router-dom";

const HERO_SLUG = "build-your-story-charm-necklace";

const BUNDLES = [
  { name: "Start Your Story", includes: "1 Chain + 1 Charm", note: "Begin your story.", featured: false },
  { name: "Build Your Story", includes: "1 Chain + 3 Charms", note: "Most Loved", featured: true },
  { name: "The Full Story", includes: "1 Chain + 5 Charms", note: "Maximum meaning.", featured: false },
];

export default function Bundles() {
  return (
    <section className="py-20 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-5">Save More</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground">Build more. Save more.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-8 items-stretch">
          {BUNDLES.map((b) => (
            <div
              key={b.name}
              className={`relative flex flex-col p-8 lg:p-10 text-center transition-colors ${
                b.featured ? "bg-background shadow-luxe border hairline md:scale-[1.04] z-10" : "bg-background/60 border hairline"
              }`}
            >
              {b.featured && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-luxe uppercase bg-foreground text-background px-5 py-2">
                  Most Loved
                </span>
              )}
              <h3 className="font-display text-2xl font-normal text-foreground mt-3">{b.name}</h3>
              <p className="text-sm text-muted-foreground mt-3">{b.includes}</p>
              <p className="text-[11px] tracking-wide-sm uppercase text-foreground/60 mt-6">{b.note}</p>
              <Link to={`/product/${HERO_SLUG}`} className={`mt-8 text-[11px] tracking-wide-sm uppercase py-3.5 transition-colors ${b.featured ? "bg-foreground text-background hover:bg-foreground/85" : "border hairline text-foreground hover:bg-secondary"}`}>
                Choose this
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 text-[11px] tracking-wide-sm uppercase text-muted-foreground">
          Save more with more charms
        </p>
      </div>
    </section>
  );
}