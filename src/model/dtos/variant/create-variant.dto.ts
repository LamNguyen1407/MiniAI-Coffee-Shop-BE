export class PriceChangeType {
    type: 'percent' | 'fixed';
    percent?: number;
    amount?: number;
}

export class OptionType {
    id: string;
    label: string;
    priceChange?: PriceChangeType
}

export class CreateVariantDto {
    id: string;
    label: string;
    type: string;
    default: any;
    options: OptionType[];
}
