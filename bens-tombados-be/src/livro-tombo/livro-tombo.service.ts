import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LivroTombo } from './entities/livro-tombo.entity';

@Injectable()
export class LivroTomboService {
  constructor(
    @InjectRepository(LivroTombo)
    private readonly livroTomboRepository: Repository<LivroTombo>,
  ) {}

  async create(data: Partial<LivroTombo>): Promise<LivroTombo> {
    const novoLivro = this.livroTomboRepository.create(data);
    return this.livroTomboRepository.save(novoLivro);
  }

  async findAll(): Promise<LivroTombo[]> {
    return this.livroTomboRepository.find();
  }

  async findOne(id: number): Promise<LivroTombo> {
    return this.livroTomboRepository.findOneBy({ idLivro: id });
  }

  async findByIds(ids: number[]): Promise<LivroTombo[]> {
    return this.livroTomboRepository.findBy({
      idLivro: In(ids),
    });
  }

  async update(id: number, data: Partial<LivroTombo>): Promise<LivroTombo> {
    await this.livroTomboRepository.update(id, data);
    return this.livroTomboRepository.findOneBy({ idLivro: id });
  }

  async delete(id: number): Promise<void> {
    await this.livroTomboRepository.delete(id);
  }
}
