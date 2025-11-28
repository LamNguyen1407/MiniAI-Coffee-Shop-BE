import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from 'src/model/dtos/variant/create-variant.dto';
import { UpdateVariantDto } from 'src/model/dtos/variant/update-variant.dto';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  async create(@Body() createVariantDto: CreateVariantDto) {
    return await this.variantService.create(createVariantDto);
  }

  @Get()
  async findAll() {
    return await this.variantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantService.update(+id, updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantService.remove(+id);
  }
}
