import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtoLegalService } from './ato-legal.service';
import { AtoLegalController } from './ato-legal.controller';
import { AtoLegal } from './entities/ato-legal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtoLegal])],
  providers: [AtoLegalService],
  controllers: [AtoLegalController],
  exports: [AtoLegalService],
})
export class AtoLegalModule {}
