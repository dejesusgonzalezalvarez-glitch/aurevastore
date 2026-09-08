import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CartButton from "@/components/CartButton";

const HERO_SLUG = "build-your-story-charm-necklace";

const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "Build Your Story", to: `/product/${HERO_SLUG}` },
  { label: "Our Story", to: "/our-story" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-background/90 backdrop-blur-md transition-shadow ${scrolled ? "shadow-float" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button className="md:hidden p-2 -ml-2 text-foreground" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <nav className="hidden md:flex items-center gap-8 flex-1">
            {NAV.slice(0, 2).map((n) => (
              <Link key={n.label} to={n.to} className="text-[11px] tracking-wide-sm uppercase text-foreground/80 hover:text-foreground transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="font-display text-2xl sm:text-3xl tracking-[0.25em] text-foreground font-medium select-none" aria-label="AUREVA home">
            AUREVA
          </Link>

          <nav className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {NAV.slice(2).map((n) => (
              <Link key={n.label} to={n.to} className="text-[11px] tracking-wide-sm uppercase text-foreground/80 hover:text-foreground transition-colors">
                {n.label}
              </Link>
            ))}
            <Link to={`/product/${HERO_SLUG}`} className="text-[11px] tracking-wide-sm uppercase bg-foreground text-background px-5 py-2.5 hover:bg-foreground/85 transition-colors">
              Create Yours
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-1 flex-1 justify-end">
            <CartButton />
          </div>
        </div>
        <div className="hidden md:flex items-center justify-end -mt-2 pb-1">
          <CartButton />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-[82%] max-w-sm bg-background shadow-luxe flex flex-col animate-fade-in">
            <div className="flex items-center justify-between px-5 h-16 border-b hairline">
              <span className="font-display text-xl tracking-[0.25em]">AUREVA</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2"><X size={20} strokeWidth={1.5} /></button>
            </div>
            <nav className="flex flex-col px-5 py-4 gap-1">
              {NAV.map((n) => (
                <Link key={n.label} to={n.to} className="py-3 text-sm tracking-wide-sm uppercase text-foreground/80 border-b hairline">
                  {n.label}
                </Link>
              ))}
              <Link to={`/product/${HERO_SLUG}`} className="mt-5 text-center text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-4">
                Create Yours
              </Link>
              <Link to="/contact" className="mt-3 text-center text-[11px] tracking-wide-sm uppercase border hairline py-4 text-foreground">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}