import { useEffect } from "react";

export const SITE_NAME = "AUREVA";
export const SITE_TAGLINE = "Wear Your Story";
// PLACEHOLDER — confirm the real support inbox before launch (see src/pages/Contact.jsx).
export const SUPPORT_EMAIL = "hello@aureva.com";
export const SITE_DESCRIPTION =
  "AUREVA creates personalized jewelry that tells your story — necklaces and charms designed around the people, memories and moments that matter most.";
export const DEFAULT_OG_IMAGE =
  "https://static.wixstatic.com/media/204143_37e83218c95247d1beea1420347d352d~mv2.jpg";

// Resolve a route path (or already-absolute URL) to an absolute URL against the
// current origin. Keeps canonical/og:url/schema values correct without hardcoding a domain.
export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return undefined;
  if (typeof pathOrUrl === "string" && /^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  if (typeof window !== "undefined") return new URL(pathOrUrl, window.location.origin).href;
  return pathOrUrl;
}

// Strip HTML tags from a Wix description for use in plain-text contexts
// (meta description, schema) without leaking markup.
export function stripHtml(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncate(text, max = 155) {
  const t = stripHtml(text);
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

// Best-effort ISO currency code from a formatted price ("€129.00" -> "EUR").
// Falls back to the provided default; the caller can also pass an explicit code.
export function currencyCode(formattedAmount, fallback = "USD") {
  if (!formattedAmount) return fallback;
  if (/CA\$|\bCAD\b/.test(formattedAmount)) return "CAD";
  if (/A\$|\bAUD\b/.test(formattedAmount)) return "AUD";
  if (/\$/.test(formattedAmount)) return "USD";
  if (/€/.test(formattedAmount)) return "EUR";
  if (/£/.test(formattedAmount)) return "GBP";
  return fallback;
}

/* ---------------------------------------------------------------------------
 * Schema.org builders (JSON-LD, from real data only — never fabricated).
 * ------------------------------------------------------------------------ */
export function organizationSchema(
  /** @type {{ url?: string, image?: string }} */ { url, image } = {}
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl(url || "/"),
    slogan: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    logo: absoluteUrl(image || DEFAULT_OG_IMAGE),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: absoluteUrl(it.path) } : {}),
    })),
  };
}

export function productSchema({ name, image, description, url, price, priceCurrency, availability, sku, brand }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: image ? absoluteUrl(image) : undefined,
    description: description ? stripHtml(description) : undefined,
    ...(sku ? { sku } : {}),
    brand: { "@type": "Brand", name: brand || SITE_NAME },
    ...(url ? { url: absoluteUrl(url) } : {}),
    offers: {
      "@type": "Offer",
      ...(url ? { url: absoluteUrl(url) } : {}),
      priceCurrency: priceCurrency || "USD",
      ...(price != null && price !== "" ? { price } : {}),
      availability:
        availability === "OUT_OF_STOCK"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };
}

export function faqSchema(questions) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };
}

/* ---------------------------------------------------------------------------
 * <Seo> — sets document title + meta/link tags and injects JSON-LD per route.
 * CSR-only by design (this is a client-rendered SPA); tags update after mount.
 * ------------------------------------------------------------------------ */
function upsertHead(tag, attrs, id, textContent) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector(`[data-seo="${id}"]`);
  if (!el && attrs) {
    // Adopt the matching static tag already in index.html (og:title, og:image, meta
    // description, …) instead of appending a duplicate — a page with two og:image
    // tags lets a crawler pick the wrong (static default) one over the real product image.
    const [firstKey, firstValue] = Object.entries(attrs)[0] || [];
    if (firstKey === "name" || firstKey === "property" || firstKey === "rel") {
      el = document.head.querySelector(`${tag}[${firstKey}="${firstValue}"]`);
    }
  }
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  el.setAttribute("data-seo", id);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) el.removeAttribute(k);
      else el.setAttribute(k, v);
    }
  }
  if (textContent !== undefined) el.textContent = textContent;
  return el;
}

/**
 * @param {{ title?: string, description?: string, canonicalPath?: string | null, ogImage?: string, ogType?: string, jsonLd?: object | object[], robots?: string }} props
 */
export function Seo({ title, description, canonicalPath, ogImage, ogType = "website", jsonLd, robots = "index, follow" }) {
  const jsonLdKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) document.title = title;

    const origin = window.location.origin;
    const canonical = canonicalPath != null ? origin + canonicalPath : window.location.href.split(/[?#]/)[0];
    const image = absoluteUrl(ogImage || DEFAULT_OG_IMAGE);
    const descriptionStr = description || SITE_DESCRIPTION;
    const titleStr = title || SITE_NAME;

    upsertHead("meta", { name: "description", content: descriptionStr }, "meta-description");
    upsertHead("meta", { name: "robots", content: robots }, "meta-robots");
    upsertHead("link", { rel: "canonical", href: canonical }, "canonical");

    upsertHead("meta", { property: "og:title", content: titleStr }, "og-title");
    upsertHead("meta", { property: "og:description", content: descriptionStr }, "og-description");
    upsertHead("meta", { property: "og:type", content: ogType }, "og-type");
    upsertHead("meta", { property: "og:url", content: canonical }, "og-url");
    upsertHead("meta", { property: "og:image", content: image }, "og-image");

    upsertHead("meta", { name: "twitter:card", content: "summary_large_image" }, "twitter-card");
    upsertHead("meta", { name: "twitter:title", content: titleStr }, "twitter-title");
    upsertHead("meta", { name: "twitter:description", content: descriptionStr }, "twitter-description");
    upsertHead("meta", { name: "twitter:image", content: image }, "twitter-image");

    document.head.querySelectorAll("script[data-seo-jsonld]").forEach((n) => n.remove());
    const list = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    list.forEach((obj) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-seo-jsonld", "1");
      el.textContent = JSON.stringify(obj);
      document.head.appendChild(el);
    });
  }, [title, description, canonicalPath, ogImage, ogType, jsonLdKey, robots]);

  return null;
}