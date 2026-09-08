import { useState } from "react";
import { Link } from "react-router-dom";

const HERO_SLUG = "build-your-story-charm-necklace";

const COLS = [
  {
    title: "Shop",
    links: [
      { label: "Build Your Story", to: `/product/${HERO_SLUG}` },
      { label: "Necklaces", to: "/shop" },
      { label: "Charms", to: "/shop" },
      { label: "Gifts", to: "/shop" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Track Your Order", to: "/track-order" },
      { label: "Shipping Policy", to: "/shipping-policy" },
      { label: "Returns & Refunds", to: "/returns" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/our-story" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
      { label: "Shipping Policy", to: "/shipping-policy" },
      { label: "Returns & Refunds", to: "/returns" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-16 border-b border-background/15">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-light leading-tight">Stay close to the story.</h2>
            <p className="mt-3 text-sm text-background/60 max-w-md leading-relaxed">
              Join AUREVA for new collections, meaningful moments and exclusive offers.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 self-end w-full" onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 bg-transparent border-b border-background/30 focus:border-background px-0 py-3 text-sm placeholder:text-background/40 outline-none transition-colors"
            />
            <button type="submit" className="text-[11px] tracking-wide-sm uppercase border border-background px-7 py-3.5 hover:bg-background hover:text-foreground transition-colors">
              {done ? "Welcome ✦" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-[11px] tracking-wide-sm uppercase text-background/50 mb-5">{c.title}</h3>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-background/80 hover:text-background transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-background/15">
          <span className="font-display text-xl tracking-[0.25em]">AUREVA</span>
          <p className="text-[11px] tracking-wide-sm uppercase text-background/40 text-center">
            Wear Your Story · Jewelry with Meaning
          </p>
          <p className="text-[11px] text-background/40">© {new Date().getFullYear()} AUREVA</p>
        </div>
      </div>
    </footer>
  );
}