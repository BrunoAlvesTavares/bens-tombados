import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AtoLegalService } from './ato-legal.service';
import { AtoLegal } from './entities/ato-legal.entity';

@Controller('atos-legais')
export class AtoLegalController {
  constructor(private readonly atoLegalService: AtoLegalService) {}

  @Post()
  async create(@Body() data: Partial<AtoLegal>): Promise<AtoLegal> {
    return this.atoLegalService.create(data);
  }

  @Get()
  async findAll(): Promise<AtoLegal[]> {
    return this.atoLegalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.atoLegalService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<AtoLegal>,
  ): Promise<AtoLegal> {
    return this.atoLegalService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.atoLegalService.delete(id);
  }
}
