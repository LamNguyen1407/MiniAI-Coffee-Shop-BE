import { Prop } from "@nestjs/mongoose";

export class Notification {
    @Prop({required: true})
    id: number;

    @Prop({required: true})
    image: string;
    
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    content: string;
}