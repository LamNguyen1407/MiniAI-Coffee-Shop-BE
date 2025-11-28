import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

// --- Sub-Schema cho Sale ---
@Schema({ _id: false })
class Sale {
  @Prop({ required: true, enum: ['percent', 'fixed'] })
  type: string;

  @Prop()
  percent?: number;

  @Prop()
  amount?: number;
}
const SaleSchema = SchemaFactory.createForClass(Sale);

// --- Main Schema ---

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop()
  description: string;

  @Prop([String])
  categoryId: string[];

  @Prop([String])
  variantId: string[];

  @Prop({ type: SaleSchema })
  sale?: Sale;

 
}

export const ProductSchema = SchemaFactory.createForClass(Product);
