import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessoService } from './processo.service';
import { ProcessoController } from './processo.controller';
import { Processo } from './entities/processo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Processo])],
  providers: [ProcessoService],
  controllers: [ProcessoController],
})
export class ProcessoModule {}
