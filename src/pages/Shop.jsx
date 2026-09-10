import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop, SORTS } from "@/hooks/useShop";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Seo } from "@/lib/seo";

export default function Shop() {
  const { categorySlug } = useParams();
  const s = useShop({ pageSize: 24 });

  // Keep the URL (collection route) and the active category in sync.
  useEffect(() => {
    if (!s.categories.length) return;
    const match = categorySlug ? s.categories.find((c) => c.slug === categorySlug) : null;
    const targetId = match ? match.id : null;
    if ((s.activeCategory?.id ?? null) !== targetId) {
      s.setActiveCategory(match || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, s.categories]);

  const category = s.categories.find((c) => c.slug === categorySlug) || null;
  const heading = category ? category.name : "Shop AUREVA";
  const intro = category?.description
    ? category.description
    : "Personalized necklaces and charms designed to be worn, layered and loved — every one with meaning.";

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
      <Seo
        title={category ? `${category.name} | AUREVA` : "Shop Personalized Jewelry — AUREVA"}
        description={intro}
        canonicalPath={category ? `/shop/${category.slug}` : "/shop"}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          ...(category ? [{ name: category.name }] : []),
        ]}
      />

      <div className="text-center mb-12 mt-8">
        <p className="text-[11px] tracking-luxe uppercase text-muted-foreground mb-4">The Collection</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground">{heading}</h1>
        <p className="mt-5 text-muted-foreground max-w-md mx-auto">{intro}</p>
      </div>

      <div className="mb-6">
        <input
          type="search"
          value={s.filters.search ?? ""}
          onChange={(e) => s.setFilters({ ...s.filters, search: e.target.value })}
          placeholder="Search the collection…"
          aria-label="Search products"
          className="w-full border-b hairline focus:border-foreground py-3 min-h-[44px] text-base bg-transparent outline-none transition-colors placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-5 border-b hairline">
        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible">
        <div className="flex sm:flex-wrap items-center gap-2 w-max sm:w-auto">
          <Link
            to="/shop"
            className={`text-[11px] tracking-wide-sm uppercase px-4 min-h-[44px] inline-flex items-center whitespace-nowrap transition-colors ${!category ? "bg-foreground text-background" : "border hairline text-foreground hover:bg-secondary"}`}
          >
            All
          </Link>
          {s.categories.map((c) => (
            <Link
              key={c.id}
              to={`/shop/${c.slug}`}
              className={`text-[11px] tracking-wide-sm uppercase px-4 min-h-[44px] inline-flex items-center whitespace-nowrap transition-colors ${category?.id === c.id ? "bg-foreground text-background" : "border hairline text-foreground hover:bg-secondary"}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-[11px] tracking-wide-sm uppercase text-muted-foreground" htmlFor="sort">Sort</label>
          <select
            id="sort"
            value={s.sort}
            onChange={(e) => s.setSort(e.target.value)}
            className="bg-transparent border-b hairline focus:border-foreground text-base sm:text-sm py-2 min-h-[44px] outline-none cursor-pointer"
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
      {s.products?.length > 0 && (
        <p className="text-center text-[10px] tracking-wide-sm uppercase text-muted-foreground mt-4">
          {s.products.some((p) => p.metafields?.aureva?.bundles) ? "Todos los productos tienen bundles disponibles" : ""}
        </p>
      )}
    </div>
  );
}