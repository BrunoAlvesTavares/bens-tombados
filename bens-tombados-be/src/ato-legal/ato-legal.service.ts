import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtoLegal } from './entities/ato-legal.entity';

@Injectable()
export class AtoLegalService {
  constructor(
    @InjectRepository(AtoLegal)
    private readonly atoLegalRepository: Repository<AtoLegal>,
  ) {}

  async create(data: Partial<AtoLegal>): Promise<AtoLegal> {
    const novoAto = this.atoLegalRepository.create(data);
    return this.atoLegalRepository.save(novoAto);
  }

  async findAll(): Promise<AtoLegal[]> {
    return await this.atoLegalRepository.find();
  }

  async findOne(id: number): Promise<AtoLegal> {
    return this.atoLegalRepository.findOneBy({ idAtoLegal: id });
  }

  async update(id: number, data: Partial<AtoLegal>): Promise<AtoLegal> {
    await this.atoLegalRepository.update(id, data);
    return this.atoLegalRepository.findOneBy({ idAtoLegal: id });
  }

  async delete(id: number): Promise<void> {
    await this.atoLegalRepository.delete(id);
  }
}
