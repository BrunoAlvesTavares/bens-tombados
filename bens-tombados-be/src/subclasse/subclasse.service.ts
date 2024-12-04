import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subclasse } from './entities/subclasse.entity';

@Injectable()
export class SubclasseService {
  constructor(
    @InjectRepository(Subclasse)
    private readonly subclasseRepository: Repository<Subclasse>,
  ) {}

  findAll(): Promise<Subclasse[]> {
    return this.subclasseRepository.find();
  }

  findOne(id: number): Promise<Subclasse> {
    return this.subclasseRepository.findOneBy({ idSubclasse: id });
  }

  async findByIds(ids: number[]): Promise<Subclasse[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    const subclasses = await this.subclasseRepository.findByIds(ids);

    if (subclasses.length !== ids.length) {
      const notFoundIds = ids.filter(
        (id) => !subclasses.some((subclass) => subclass.idSubclasse === id),
      );
      throw new NotFoundException(
        `Subclasses com os IDs ${notFoundIds.join(', ')} não foram encontradas`,
      );
    }

    return subclasses;
  }

  async create(subclasse: Subclasse): Promise<Subclasse> {
    return this.subclasseRepository.save(subclasse);
  }

  async update(id: number, subclasse: Partial<Subclasse>): Promise<Subclasse> {
    const existingSubclasse = await this.subclasseRepository.findOneBy({
      idSubclasse: id,
    });
    if (!existingSubclasse) {
      throw new NotFoundException(`Subclasse com ID ${id} não encontrada`);
    }
    Object.assign(existingSubclasse, subclasse);
    return this.subclasseRepository.save(existingSubclasse);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subclasseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subclasse com ID ${id} não encontrada`);
    }
  }
}
