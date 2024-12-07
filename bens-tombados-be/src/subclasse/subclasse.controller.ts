import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { SubclasseService } from './subclasse.service';
import { Subclasse } from './entities/subclasse.entity';

@Controller('subclasse')
export class SubclasseController {
  constructor(private readonly subclasseService: SubclasseService) {}

  @Get()
  findAll(): Promise<Subclasse[]> {
    return this.subclasseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Subclasse> {
    return this.subclasseService.findOne(id);
  }

  @Post()
  async create(@Body() body: any): Promise<Subclasse> {
    const subclasse = {
      ...body,
      classe: { idClasse: body.idClasse },
    };

    return this.subclasseService.create(subclasse as Subclasse);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() subclasse: Partial<Subclasse>,
  ): Promise<Subclasse> {
    return this.subclasseService.update(id, subclasse);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.subclasseService.remove(id);
  }
}
