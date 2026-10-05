const premiumFallbackImages = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
];

export function getProductImageUrl(product, index = 0) {
  const image = product?.image || "";
  const normalized = typeof image === "string" ? image.trim() : "";

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  return premiumFallbackImages[index % premiumFallbackImages.length];
}
