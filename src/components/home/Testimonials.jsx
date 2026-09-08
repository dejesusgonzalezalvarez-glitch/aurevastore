const REVIEWS = [
  { text: "I chose charms that represent my family. I wear it every day.", author: "Maya R." },
  { text: "It was the most meaningful gift I've ever given.", author: "Elena S." },
  { text: "Beautiful, personal and unlike anything else in my jewelry collection.", author: "Sofia L." },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground">Stories from our community.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="text-center">
              <div className="text-foreground tracking-[0.3em] mb-5" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="font-display text-xl lg:text-2xl font-light italic text-foreground leading-relaxed">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 text-[11px] tracking-wide-sm uppercase text-muted-foreground">{r.author}</figcaption>
            </figure>
          ))}
        </div>
        <p className="text-center mt-12 text-[11px] text-muted-foreground/70">
          Real reviews can be added from your store admin.
        </p>
      </div>
    </section>
  );
}