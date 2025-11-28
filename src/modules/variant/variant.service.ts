import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVariantDto } from 'src/model/dtos/variant/create-variant.dto';
import { UpdateVariantDto } from 'src/model/dtos/variant/update-variant.dto';
import { Variant } from 'src/model/schemas/variant.schema';


@Injectable()
export class VariantService {
  constructor(@InjectModel(Variant.name) private variantModel: Model<Variant>) {}
  async create(createVariantDto: CreateVariantDto) {
    return await this.variantModel.create(createVariantDto);
  }

  async findAll() {
    return await this.variantModel.find();
  }

  async findAllByIds(ids: string[]) {
    return await this.variantModel.find({ id: { $in: ids } })
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
