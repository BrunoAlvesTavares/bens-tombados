import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() data: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.create(data);
  }

  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Categoria>,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoriaService.delete(id);
  }
}
