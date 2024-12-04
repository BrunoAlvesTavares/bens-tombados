import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DistritoService } from './distrito.service';
import { Distrito } from './entities/distrito.entity';

@Controller('distrito')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @Get()
  findAll() {
    return this.distritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.distritoService.findOne(id);
  }

  @Post()
  create(@Body() distrito: Partial<Distrito>) {
    return this.distritoService.create(distrito);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() distrito: Partial<Distrito>) {
    return this.distritoService.update(id, distrito);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.distritoService.remove(id);
  }
}
