import { Link } from "react-router-dom";

const HERO_SLUG = "build-your-story-charm-necklace";

const STEPS = [
  { n: "01", title: "Choose your chain.", text: "Select the style that most represents you." },
  { n: "02", title: "Choose what matters.", text: "Add initials, symbols or charms." },
  { n: "03", title: "Wear your story.", text: "Create a completely personal piece." },
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
          <Link to={`/product/${HERO_SLUG}`} className="inline-block text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-10 py-4 hover:bg-background transition-colors">
            Start Creating
          </Link>
        </div>
      </div>
    </section>
  );
}