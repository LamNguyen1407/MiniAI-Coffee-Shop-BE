interface PriceChange {
  type: "fixed" | "percent";
  amount?: number;
  percent?: number;
}

interface Option {
  id: string;
  name: string;
  priceChange?: PriceChange;
}

interface Variant {
  id: string;
  name: string;
  options: Option[];
}

interface Product  {
  price: number;
  sale?: {
    type: "fixed" | "percent";
    amount?: number;
    percent?: number;
  };
  variants?: Variant[];
}

export type { PriceChange, Option, Variant, Product };