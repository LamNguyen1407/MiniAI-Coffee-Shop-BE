import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Order extends Document {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true, default: 'pending' })
    status: 'pending' | 'paid' | 'failed';

    @Prop({ type: Array, required: true })
    items: { productId: string; quantity: number; options: any; price: number }[];

    @Prop({ required: true })
    totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);