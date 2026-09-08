import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { searchProducts } from "@/rest/wix-store-catalog";
import ProductGrid from "@/components/ProductGrid";

// Full-screen mobile-first search: big input, live results, 44px targets,
// ESC/backdrop close, body scroll lock, iPhone safe-area padding.
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setResults(null);
    setLoading(false);
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      searchProducts({ limit: 12, search: q })
        .then(({ products }) => {
          setResults(products || []);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  if (!open) return null;
  const searching = query.trim().length >= 2;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in" role="dialog" aria-modal="true" aria-label="Search products">
      <div
        className="mx-auto w-full max-w-3xl px-5 sm:px-8"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-2 border-b hairline focus-within:border-foreground transition-colors">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search necklaces, charms…"
            aria-label="Search products"
            className="flex-1 bg-transparent py-3 min-h-[48px] text-base outline-none placeholder:text-muted-foreground/60"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div
          className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-8"
          onClick={(e) => {
            if (e.target.closest("a")) onClose();
          }}
        >
          {searching ? (
            <ProductGrid
              products={results}
              loading={loading}
              emptyMessage="No matches."
              emptyHint="Try another word or browse the full collection."
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Type at least 2 characters to search the collection.</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="mt-6 inline-flex items-center justify-center min-h-[44px] text-[11px] tracking-wide-sm uppercase border hairline text-foreground px-8 hover:bg-secondary transition-colors"
              >
                Browse everything
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}