import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classe } from './entities/classe.entity';

@Injectable()
export class ClasseService {
  constructor(
    @InjectRepository(Classe)
    private readonly classeRepository: Repository<Classe>,
  ) {}

  async create(data: Partial<Classe>): Promise<Classe> {
    const novaClasse = this.classeRepository.create(data);
    return this.classeRepository.save(novaClasse);
  }

  async findAll(): Promise<Classe[]> {
    return this.classeRepository.find();
  }

  async findOne(id: number): Promise<Classe> {
    return this.classeRepository.findOneBy({ idClasse: id });
  }

  async update(id: number, data: Partial<Classe>): Promise<Classe> {
    await this.classeRepository.update(id, data);
    return this.classeRepository.findOneBy({ idClasse: id });
  }

  async delete(id: number): Promise<void> {
    await this.classeRepository.delete(id);
  }
}
