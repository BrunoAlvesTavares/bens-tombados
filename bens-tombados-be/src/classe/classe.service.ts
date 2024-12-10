import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classe } from './entities/classe.entity';
import { SubclasseService } from 'src/subclasse/subclasse.service';
import { Subclasse } from 'src/subclasse/entities/subclasse.entity';

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

  findOne(id: number) {
    return this.classeRepository.findOne({
      where: { idClasse: id },
      relations: ['subclasses'],
    });
  }

  async update(id: number, data: Partial<Classe>): Promise<Classe> {
    await this.classeRepository.update(id, data);
    return this.classeRepository.findOneBy({ idClasse: id });
  }

  async delete(id: number): Promise<void> {
    const classe = await this.classeRepository.findOne({
      where: { idClasse: id },
      relations: ['subclasses'], // Carrega as Subclasses relacionadas
    });
  
    if (!classe) {
      throw new NotFoundException(`Classe com ID ${id} não encontrada.`);
    }
  
    // Deleta as Subclasses associadas
    if (classe.subclasses && classe.subclasses.length > 0) {
      await this.classeRepository.manager
        .getRepository(Subclasse)
        .remove(classe.subclasses);
    }
  
    // Agora deleta a Classe
    await this.classeRepository.remove(classe);
  }
}
