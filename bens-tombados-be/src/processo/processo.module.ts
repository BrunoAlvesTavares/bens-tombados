import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessoService } from './processo.service';
import { ProcessoController } from './processo.controller';
import { Processo } from './entities/processo.entity';
import { SubclasseModule } from 'src/subclasse/subclasse.module';
import { ClasseModule } from 'src/classe/classe.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { MunicipioModule } from 'src/municipio/municipio.module';
import { AtoLegalModule } from 'src/ato-legal/ato-legal.module';
import { LivroTomboModule } from 'src/livro-tombo/livro-tombo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Processo]),
    SubclasseModule,
    ClasseModule,
    CategoriaModule,
    MunicipioModule,
    AtoLegalModule,
    LivroTomboModule,
  ],
  providers: [ProcessoService],
  controllers: [ProcessoController],
})
export class ProcessoModule {}
