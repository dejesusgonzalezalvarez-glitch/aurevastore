import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import CartButton from "@/components/CartButton";
import SearchOverlay from "@/components/SearchOverlay";

const HERO_SLUG = "build-your-story-charm-necklace";

const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "Build Your Story", to: `/product/${HERO_SLUG}` },
  { label: "Our Story", to: "/our-story" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-background/90 backdrop-blur-md transition-shadow`}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between h-16">
          <button className="flex items-center justify-center p-1 min-w-[44px] min-h-[44px] text-foreground" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={24} strokeWidth={1.5} />
          </button>

          <div className="hidden flex-1 items-center justify-center gap-2">
            <Link to="/" className="font-display text-lg tracking-[0.25em] text-foreground font-medium select-none" aria-label="AUREVA home">
              AUREVA
            </Link>
          </div>

          <div className="hidden flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground">
              <Search size={22} strokeWidth={1.5} />
            </button>
            <CartButton />
          </div>
        </div>

        <nav className={`fixed top-0 right-0 inset-y-0 z-50 md:hidden w-80 max-w-sm bg-background shadow-luxe flex flex-col border-l border-border animate-fade-in`}>
          <div className="flex items-center justify-between px-4 py-3 border-b hairline">
            <span className="font-display text-xl tracking-[0.25em]">AUREVA</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"><X size={24} strokeWidth={1.5} /></button>
          </div>
          <div className="flex flex-col px-4 py-4 gap-2">
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} className="py-2.5 text-sm tracking-wide-sm uppercase text-foreground/80 border-b hairline">
                {n.label}
              </Link>
            ))}
            <Link to={`/product/${HERO_SLUG}`} className="mt-4 text-center text-[11px] tracking-wide-sm uppercase bg-foreground text-background py-3 min-h-[44px] flex items-center justify-center">
              Create Yours
            </Link>
            <Link to="/track-order" className="mt-2 text-center text-[11px] tracking-wide-sm uppercase border hairline py-3 min-h-[44px] flex items-center justify-center text-foreground">
              Track Order
            </Link>
            <Link to="/contact" className="mt-2 text-center text-[11px] tracking-wide-sm uppercase border hairline py-3 min-h-[44px] flex items-center justify-center text-foreground">
              Contact
            </Link>
          </div>
        </nav>

        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </header>
  );
}