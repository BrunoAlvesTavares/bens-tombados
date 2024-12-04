import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // Criar nova categoria
  async create(data: Partial<Categoria>): Promise<Categoria> {
    const novaCategoria = this.categoriaRepository.create(data);
    return this.categoriaRepository.save(novaCategoria);
  }

  // Obter todas as categorias
  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  // Obter uma categoria pelo ID
  async findOne(id: number): Promise<Categoria> {
    return this.categoriaRepository.findOneBy({ idCategoria: id });
  }

  // Atualizar uma categoria
  async update(id: number, data: Partial<Categoria>): Promise<Categoria> {
    await this.categoriaRepository.update(id, data);
    return this.categoriaRepository.findOneBy({ idCategoria: id });
  }

  // Excluir uma categoria
  async delete(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
