import { useMemo, useState } from "react";

function calculateBundlePrice(unitPrice, quantity, discountPercent) {
  const baseTotal = unitPrice * quantity;
  const discountFactor = 1 - discountPercent / 100;
  const finalTotal = Math.round(baseTotal * discountFactor * 100) / 100;
  return {
    baseTotal,
    discountPercent,
    discountAmount: Math.round((baseTotal - finalTotal) * 100) / 100,
    finalTotal,
  };
}

function getDiscountForQuantity(quantity) {
  if (quantity <= 1) return 0;
  if (quantity >= 4) return 40;
  if (quantity >= 3) return 30;
  if (quantity >= 2) return 20;
  return 0;
}

// Fixed to en-US — this storefront is English-only, so prices should read "$89.00"
// regardless of the shopper's browser locale.
function formatMoney(amount, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(amount);
}

export function useBundlePricing(product) {
  const variant = product?.variantsInfo?.variants?.[0] || null;
  const unitPrice = Number(
    variant?.price?.actualPrice?.amount ?? product?.actualPriceRange?.minValue?.amount ?? 0
  );
  const currency = variant?.price?.actualPrice?.currency || product?.currency || "USD";

  const bundleOptions = useMemo(() => {
    const options = [];
    for (let i = 1; i <= 4; i++) {
      const discount = getDiscountForQuantity(i);
      const { baseTotal, discountAmount, finalTotal } = calculateBundlePrice(unitPrice, i, discount);
      options.push({
        quantity: i,
        discount,
        baseTotal: formatMoney(baseTotal, currency),
        discountAmount: formatMoney(discountAmount, currency),
        finalTotal: formatMoney(finalTotal, currency),
        label: `${i} ${i === 1 ? "UNIT" : "UNITS"}`,
        description: discount > 0 ? `SAVE ${discount}%` : "Regular price",
      });
    }
    return options;
  }, [unitPrice, currency]);

  return { bundleOptions, unitPrice: formatMoney(unitPrice, currency) };
}

export function BundleOptions({ product, onSelect }) {
  const { bundleOptions, unitPrice } = useBundlePricing(product);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelect?.(index);
  };

  const selected = bundleOptions[selectedIndex];
  const discountPercent = selected.discount;

  return useMemo(() => (
    <div className="bundle-options mt-6">
      <div className="flex flex-col sm:flex-row gap-3">
        {bundleOptions.map((option, i) => (
          <button
            key={option.quantity}
            onClick={() => handleSelect(i)}
            className={`flex-1 flex flex-col items-start gap-0.5 rounded-lg border p-3 transition-all duration-200 ${
              i === selectedIndex
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-hairline text-muted-foreground hover:bg-secondary/50"
            }`}
            style={{
              minHeight: "56px",
              fontSize: "11px",
              letterSpacing: "0.18em",
            }}
          >
            <span className="text-foreground">{option.label}</span>
            <span className="text-[10px] tracking-wide-sm opacity-60">{option.description}</span>
            <span className="mt-1 flex items-baseline gap-2">
              <span className="text-foreground/80">{option.finalTotal}</span>
              {option.discount > 0 && (
                <span className="text-[10px] tracking-wider opacity-40 line-through">{option.baseTotal}</span>
              )}
            </span>
          </button>
        ))}
      </div>

      {selected.discount > 0 && (
        <p className="mt-3 text-[10px] tracking-wide-sm uppercase text-foreground/80">
          You save {selected.discount}% {selected.quantity === 1 ? "" : "on this bundle"}
        </p>
      )}

      {selected.discount > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          Regular price: {selected.baseTotal} → Bundle price: {selected.finalTotal}
          {" "}({selected.discountAmount} saved)
        </p>
      )}
    </div>
  ), [bundleOptions, selectedIndex, unitPrice]);
}
