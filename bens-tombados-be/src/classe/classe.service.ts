import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classe } from './entities/classe.entity';
import { SubclasseService } from 'src/subclasse/subclasse.service';

@Injectable()
export class ClasseService {
  constructor(
    @InjectRepository(Classe)
    private readonly classeRepository: Repository<Classe>,
    private readonly subclasseService: SubclasseService,
  ) {}

  async create(data: Partial<Classe>): Promise<Classe> {
    let subclasses = [];
    if (data.subclasses && data.subclasses.length > 0) {
      const subclassIds = data.subclasses as unknown as number[];

      subclasses = await this.subclasseService.findByIds(subclassIds);

      if (subclasses.length !== subclassIds.length) {
        const notFoundIds = subclassIds.filter(
          (id) => !subclasses.some((subclass) => subclass.idSubclasse === id),
        );
        throw new NotFoundException(
          `Subclasses com os IDs ${notFoundIds.join(', ')} não foram encontradas.`,
        );
      }
    }

    const novaClasse = this.classeRepository.create({
      nomeClasse: data.nomeClasse,
      subclasses,
    });

    return this.classeRepository.save(novaClasse);
  }

  async findAll(): Promise<Classe[]> {
    return this.classeRepository.find({
      relations: ['subclasses'],
    });
  }

  async findByIds(ids: number[]): Promise<Classe[]> {
    return this.classeRepository.findByIds(ids);
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
