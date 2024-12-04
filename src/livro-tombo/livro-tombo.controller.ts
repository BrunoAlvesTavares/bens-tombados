import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LivroTomboService } from './livro-tombo.service';
import { LivroTombo } from './entities/livro-tombo.entity';

@Controller('livros-tombo')
export class LivroTomboController {
  constructor(private readonly livroTomboService: LivroTomboService) {}

  @Post()
  async create(@Body() data: Partial<LivroTombo>): Promise<LivroTombo> {
    return this.livroTomboService.create(data);
  }

  @Get()
  async findAll(): Promise<LivroTombo[]> {
    return this.livroTomboService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LivroTombo> {
    return this.livroTomboService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<LivroTombo>,
  ): Promise<LivroTombo> {
    return this.livroTomboService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.livroTomboService.delete(id);
  }
}
