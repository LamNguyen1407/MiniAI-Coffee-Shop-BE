import { Option, Product } from "src/type/type";

export function calcFinalPriceBackend(
  product: Product,
  options?: Record<string, string | string[]>
) {
  let finalPrice = product.price;

  // --- APPLY SALE ---
  if (product.sale) {
    if (product.sale.type === "fixed") {
      finalPrice = product.price - (product.sale.amount ?? 0);
    } else {
      finalPrice = product.price * (1 - (product.sale.percent ?? 0));
    }
  }

  // --- APPLY VARIANTS ---
  if (options && product.variants) {

    // FIX: khai báo type cho selectedOptions
    const selectedOptions: Option[] = [];

    for (const variantKey in options) {
      const variant = product.variants.find((v) => v.id === variantKey);
      if (!variant) continue;

      const currentOption = options[variantKey];

      if (typeof currentOption === "string") {
        const selected = variant.options.find((o) => o.id === currentOption);
        if (selected) selectedOptions.push(selected);
      } else {
        const selecteds = variant.options.filter((o) =>
          currentOption.includes(o.id)
        );
        selectedOptions.push(...selecteds);
      }
    }

    finalPrice = selectedOptions.reduce((price, option) => {
      if (option.priceChange) {
        if (option.priceChange.type === "fixed") {
          return price + (option.priceChange.amount ?? 0);
        } else {
          return price + product.price * (option.priceChange.percent ?? 0);
        }
      }
      return price;
    }, finalPrice);
  }

  return finalPrice;
}
