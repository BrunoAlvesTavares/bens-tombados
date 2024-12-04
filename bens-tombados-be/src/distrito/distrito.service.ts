import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Distrito } from './entities/distrito.entity';

@Injectable()
export class DistritoService {
  constructor(
    @InjectRepository(Distrito)
    private readonly distritoRepository: Repository<Distrito>,
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

  create(distrito: Partial<Distrito>) {
    const newDistrito = this.distritoRepository.create(distrito);
    return this.distritoRepository.save(newDistrito);
  }

  update(id: number, updateDistrito: Partial<Distrito>) {
    return this.distritoRepository.update(id, updateDistrito);
  }

  remove(id: number) {
    return this.distritoRepository.delete(id);
  }
}
