import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { Processo } from './entities/processo.entity';

@Controller('processos')
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService) {}

  @Post()
  async create(@Body() data: Partial<Processo>): Promise<Processo> {
    return this.processoService.create(data);
  }

  @Get()
  async findAll(): Promise<Processo[]> {
    return this.processoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Processo> {
    return this.processoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Processo>,
  ): Promise<Processo> {
    return this.processoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.processoService.delete(id);
  }
}
