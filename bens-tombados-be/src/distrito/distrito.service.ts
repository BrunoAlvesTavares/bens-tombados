import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Distrito } from './entities/distrito.entity';
import { MunicipioService } from 'src/municipio/municipio.service';

@Injectable()
export class DistritoService {
  constructor(
    @InjectRepository(Distrito)
    private readonly distritoRepository: Repository<Distrito>,
    private readonly municipioService: MunicipioService,
  ) {}

  findAll() {
    return this.distritoRepository.find({ relations: ['municipio'] });
  }

  findOne(id: number) {
    return this.distritoRepository.findOne({
      where: { idDistrito: id },
      relations: ['municipio'],
    });
  }

  async create(distrito: Partial<Distrito>) {
    const municipio = await this.municipioService.findWhere({
      idMunicipio: distrito.municipio as unknown as number,
    });

    if (!municipio) {
      throw new NotFoundException('Município não encontrado');
    }

    const newDistrito = this.distritoRepository.create({
      nomeDistrito: distrito.nomeDistrito,
      municipio,
    });

    return this.distritoRepository.save(newDistrito);
  }

  update(id: number, updateDistrito: Partial<Distrito>) {
    return this.distritoRepository.update(id, updateDistrito);
  }

  remove(id: number) {
    return this.distritoRepository.delete(id);
  }
}
