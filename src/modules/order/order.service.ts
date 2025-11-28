import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/model/dtos/order/create-order.dto';
import { UpdateOrderDto } from 'src/model/dtos/order/update-order.dto';
import { ProductService } from '../product/product.service';
import { VariantService } from '../variant/variant.service';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/model/schemas/order.schema';
import { Model } from 'mongoose';
import { calcFinalPriceBackend } from 'src/utils/calcFinalPrice';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly productService: ProductService,
    private readonly variantService: VariantService
  ){}
  async create(createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const products = await this.productService.findAllByIds(productIds);

    const variants = await this.variantService.findAll();
    
    const productsWithVariants = products.map((product) => ({
      ...product.toObject(),
      quantity: createOrderDto.items.find((item) => item.productId === product.id)?.quantity,
      variants: variants.filter((variant) => product.variantId.includes(variant.id)),
      options: createOrderDto.items.find((item) => item.productId === product.id)?.options
    }))

    const processedItem = productsWithVariants.map((product) => {
      const finalPrice = product.quantity ? product.quantity * calcFinalPriceBackend(product as any, product.options) : 0

      return { ...product, finalPrice };
    })

    const finalItems = processedItem.map((item) => ({ productId: item.id, quantity: item.quantity, options: item.options, price: item.finalPrice }));

    const totalPrice = processedItem.reduce((total, item) => total + item.finalPrice, 0);
    return await this.orderModel.create({ 
      userId: createOrderDto.userId,
      totalPrice,
      items: finalItems
    })
    
  }

    findAll() {
    return `This action returns all order`;
  }

  async findOneByUserId(id: string) {
    return await this.orderModel.find({userId: id});
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
