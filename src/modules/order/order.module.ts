import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../product/product.module';
import { VariantModule } from '../variant/variant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/model/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule, 
    VariantModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
