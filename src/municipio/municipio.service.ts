import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async create(data: Partial<Municipio>): Promise<Municipio> {
    const novoMunicipio = this.municipioRepository.create(data);
    return this.municipioRepository.save(novoMunicipio);
  }

  async findAll(): Promise<Municipio[]> {
    return this.municipioRepository.find();
  }

  async findOne(id: number): Promise<Municipio> {
    return this.municipioRepository.findOneBy({ idMunicipio: id });
  }

  async update(id: number, data: Partial<Municipio>): Promise<Municipio> {
    await this.municipioRepository.update(id, data);
    return this.municipioRepository.findOneBy({ idMunicipio: id });
  }

  async delete(id: number): Promise<void> {
    await this.municipioRepository.delete(id);
  }
}