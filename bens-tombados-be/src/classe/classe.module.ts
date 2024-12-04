import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasseService } from './classe.service';
import { ClasseController } from './classe.controller';
import { Classe } from './entities/classe.entity';
import { SubclasseModule } from 'src/subclasse/subclasse.module';

@Module({
  imports: [TypeOrmModule.forFeature([Classe]), SubclasseModule],
  providers: [ClasseService],
  controllers: [ClasseController],
})
export class ClasseModule {}
