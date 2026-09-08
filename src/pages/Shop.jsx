import { useShop, SORTS } from "@/hooks/useShop";
import ProductGrid from "@/components/ProductGrid";

export default function Shop() {
  const s = useShop({ pageSize: 24 });

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="text-center mb-12">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">The Collection</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground">Shop AUREVA</h1>
        <p className="mt-5 text-muted-foreground max-w-md mx-auto">Pieces designed to be worn, layered and loved — every one with meaning.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b hairline">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => s.setActiveCategory(null)}
            className={`text-[11px] tracking-wide-sm uppercase px-4 py-2 transition-colors ${!s.activeCategory ? "bg-foreground text-background" : "border hairline text-foreground hover:bg-secondary"}`}
          >
            All
          </button>
          {s.categories.map((c) => (
            <button
              key={c.id}
              onClick={() => s.setActiveCategory(c)}
              className={`text-[11px] tracking-wide-sm uppercase px-4 py-2 transition-colors ${s.activeCategory?.id === c.id ? "bg-foreground text-background" : "border hairline text-foreground hover:bg-secondary"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-[11px] tracking-wide-sm uppercase text-muted-foreground" htmlFor="sort">Sort</label>
          <select
            id="sort"
            value={s.sort}
            onChange={(e) => s.setSort(e.target.value)}
            className="bg-transparent border-b hairline focus:border-foreground text-sm py-2 outline-none cursor-pointer"
          >
            {Object.entries(SORTS).map(([key, v]) => (
              <option key={key} value={key}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {s.error && (
        <div className="py-16 text-center">
          <p className="font-display text-2xl text-foreground">{s.error}</p>
          <button onClick={s.retry} className="mt-5 text-[11px] tracking-wide-sm uppercase border hairline px-6 py-3 hover:bg-secondary">Try again</button>
        </div>
      )}

      {!s.error && (
        <ProductGrid
          products={s.products}
          loading={s.loading}
          emptyMessage="No products yet."
          emptyHint="Try another category or check back later."
        />
      )}

      {!s.error && s.hasMore && (
        <div className="text-center mt-16">
          <button onClick={s.loadMore} disabled={s.loadingMore} className="text-[11px] tracking-wide-sm uppercase border hairline px-10 py-4 hover:bg-secondary disabled:opacity-50">
            {s.loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}