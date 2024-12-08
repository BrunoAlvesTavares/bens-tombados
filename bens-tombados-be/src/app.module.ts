import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { MunicipioModule } from './municipio/municipio.module';
import { AtoLegalModule } from './ato-legal/ato-legal.module';
import { LivroTomboModule } from './livro-tombo/livro-tombo.module';
import { ClasseModule } from './classe/classe.module';
import { ProcessoModule } from './processo/processo.module';
import { DistritoModule } from './distrito/distrito.module';
import { SubclasseModule } from './subclasse/subclasse.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tombamentopatrimonios',
      autoLoadEntities: true,
      synchronize: false,
    }),
    CategoriaModule,
    MunicipioModule,
    AtoLegalModule,
    LivroTomboModule,
    ClasseModule,
    ProcessoModule,
    DistritoModule,
    SubclasseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
