import { Controller, Get } from '@nestjs/common';
import { LogProcessoService } from './log-processo.service';

@Controller('historico-log')
export class LogProcessoController {
  constructor(private readonly logProcessoService: LogProcessoService) {}

  @Get()
  async findAll() {
    return this.logProcessoService.findAll();
  }
}
