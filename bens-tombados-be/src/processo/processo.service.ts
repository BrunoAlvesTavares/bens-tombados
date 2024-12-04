import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from './entities/processo.entity';

@Injectable()
export class ProcessoService {
  constructor(
    @InjectRepository(Processo)
    private readonly processoRepository: Repository<Processo>,
  ) {}

  async create(data: Partial<Processo>): Promise<Processo> {
    const novoProcesso = this.processoRepository.create(data);
    return this.processoRepository.save(novoProcesso);
  }

  async findAll(): Promise<Processo[]> {
    return this.processoRepository.find();
  }

  async findOne(id: number): Promise<Processo> {
    return this.processoRepository.findOneBy({ idProcesso: id });
  }

  async update(id: number, data: Partial<Processo>): Promise<Processo> {
    await this.processoRepository.update(id, data);
    return this.processoRepository.findOneBy({ idProcesso: id });
  }

  async delete(id: number): Promise<void> {
    // Remover registros relacionados na tabela Processo_Subclasse
    await this.processoRepository.query(
      `DELETE FROM Processo_Subclasse WHERE idProcesso = ?`,
      [id],
    );

    // Remover registros relacionados na tabela Processo_Classe
    await this.processoRepository.query(
      `DELETE FROM Processo_Classe WHERE idProcesso = ?`,
      [id],
    );

    // Remover registros relacionados na tabela Processo_Livro
    await this.processoRepository.query(
      `DELETE FROM Processo_Livro WHERE idProcesso = ?`,
      [id],
    );

    // Excluir o processo
    await this.processoRepository.delete(id);
  }
}
