import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClasseService } from './classe.service';
import { Classe } from './entities/classe.entity';

@Controller('classes')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}

  @Post()
  async create(@Body() data: Partial<Classe>): Promise<Classe> {
    return this.classeService.create(data);
  }

  @Get()
  async findAll(): Promise<Classe[]> {
    return this.classeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Classe> {
    return this.classeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Classe>,
  ): Promise<Classe> {
    return this.classeService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.classeService.delete(id);
  }
}
