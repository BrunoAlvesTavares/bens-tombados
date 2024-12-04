import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistritoService } from './distrito.service';
import { DistritoController } from './distrito.controller';
import { Distrito } from './entities/distrito.entity';
import { MunicipioModule } from 'src/municipio/municipio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Distrito]), MunicipioModule],
  controllers: [DistritoController],
  providers: [DistritoService],
})
export class DistritoModule {}
