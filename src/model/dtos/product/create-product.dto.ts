import { PriceChangeType } from "../variant/create-variant.dto"

export class CreateProductDto {
    id: number
    name: string
    price: number
    image: string
    description: string
    categoryId: string[]
    variantId: string[]
    sale?: PriceChangeType
}
