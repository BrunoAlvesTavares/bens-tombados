import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { Municipio } from './entities/municipio.entity';

@Controller('municipios')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  async create(@Body() data: Partial<Municipio>): Promise<Municipio> {
    return this.municipioService.create(data);
  }

  @Get()
  async findAll(): Promise<Municipio[]> {
    return this.municipioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Municipio> {
    return this.municipioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Municipio>,
  ): Promise<Municipio> {
    return this.municipioService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.municipioService.delete(id);
  }
}
