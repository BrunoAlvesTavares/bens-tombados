import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivroTomboService } from './livro-tombo.service';
import { LivroTomboController } from './livro-tombo.controller';
import { LivroTombo } from './entities/livro-tombo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LivroTombo])],
  providers: [LivroTomboService],
  controllers: [LivroTomboController],
  exports: [LivroTomboService],
})
export class LivroTomboModule {}
