import { Module } from '@nestjs/common';
import { SubclasseService } from './subclasse.service';
import { SubclasseController } from './subclasse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subclasse } from './entities/subclasse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subclasse])],
  controllers: [SubclasseController],
  providers: [SubclasseService],
})
export class SubclasseModule {}
