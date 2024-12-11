import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogProcesso } from './entities/log-processo.entity';

@Injectable()
export class LogProcessoService {
  constructor(
    @InjectRepository(LogProcesso)
    private readonly logProcessoRepository: Repository<LogProcesso>,
  ) {}

  async findAll() {
    return this.logProcessoRepository.find({
      relations: ['processo'],
      order: { dataHoraLog: 'DESC' },
    });
  }
}
