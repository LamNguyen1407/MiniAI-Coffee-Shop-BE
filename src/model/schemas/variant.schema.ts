import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


// --- Sub-Schemas (Không tạo collection riêng) ---

@Schema({ _id: false }) // Tắt _id cho sub-document để gọn data
export class PriceChange {
  @Prop({ required: true, enum: ['percent', 'fixed'] })
  type: string;

  @Prop()
  percent?: number;

  @Prop()
  amount?: number;
}
const PriceChangeSchema = SchemaFactory.createForClass(PriceChange);

@Schema({ _id: false })
export class Option {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  label: string;

  @Prop({ type: PriceChangeSchema })
  priceChange?: PriceChange;
}
const OptionSchema = SchemaFactory.createForClass(Option);

// --- Main Schema ---

@Schema({ timestamps: true })
export class Variant {

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, enum: ['single', 'multiple'] })
  type: string;

  // Kiểu Mixed: Có thể là string "m" hoặc array ["t1", "t4"]
  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  default: any;

  @Prop({ type: [OptionSchema] })
  options: Option[];
}

export const VariantSchema = SchemaFactory.createForClass(Variant);