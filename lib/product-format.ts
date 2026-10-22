// Returns null for "call for price" so callers can render the
// translated fallback themselves.
export function formatPrice(price: number | null, locale: "fa" | "en") {
  if (price === null) return null;
  return price.toLocaleString(locale === "fa" ? "fa-IR" : "en-US");
}
