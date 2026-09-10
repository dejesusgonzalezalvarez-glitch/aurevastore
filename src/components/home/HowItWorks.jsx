import { Link } from "react-router-dom";

const STEPS = [
  { n: "01", title: "Choose your piece.", text: "Every design is built around a meaning — a heart, a star, an initial." },
  { n: "02", title: "Choose your finish.", text: "Silver or gold, wherever it's offered." },
  { n: "03", title: "Wear your story.", text: "Layer it with the pieces that matter most to you." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground">Your story, in three steps.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <span className="font-display text-5xl text-muted-foreground/40 block mb-5">{s.n}</span>
              <h3 className="font-display text-2xl font-normal text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/shop" className="inline-block text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-10 py-4 hover:bg-background transition-colors">
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}