import { Module } from '@nestjs/common';
import { LogProcessoService } from './log-processo.service';
import { LogProcessoController } from './log-processo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogProcesso } from './entities/log-processo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogProcesso])],
  controllers: [LogProcessoController],
  providers: [LogProcessoService],
})
export class LogProcessoModule {}

