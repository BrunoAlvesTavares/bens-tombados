import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from './entities/processo.entity';
import { ClasseService } from 'src/classe/classe.service';
import { SubclasseService } from 'src/subclasse/subclasse.service';
import { CategoriaService } from 'src/categoria/categoria.service';
import { MunicipioService } from 'src/municipio/municipio.service';
import { AtoLegalService } from 'src/ato-legal/ato-legal.service';
import { LivroTomboService } from 'src/livro-tombo/livro-tombo.service';

@Injectable()
export class ProcessoService {
  constructor(
    @InjectRepository(Processo)
    private readonly processoRepository: Repository<Processo>,
    private readonly classeService: ClasseService,
    private readonly subclasseService: SubclasseService,
    private readonly categoriaService: CategoriaService,
    private readonly municipioService: MunicipioService,
    private readonly atoLegalService: AtoLegalService,
    private readonly livroTomboService: LivroTomboService,
  ) {}

  async create(data: Partial<Processo>): Promise<Processo> {
    const subclassesIds = data.subclasses as unknown as number[];
    const subclassesExistentes =
      await this.subclasseService.findByIds(subclassesIds);

    const classesIds = data.classes as unknown as number[];
    const classesExistentes = await this.classeService.findByIds(classesIds);

    const categoriaIds = data.categoria as unknown as number;
    const categoriaExistentes =
      await this.categoriaService.findById(categoriaIds);

    const municipioIds = data.categoria as unknown as number;
    const municipioExistentes =
      await this.municipioService.findOne(municipioIds);

    const atoLegalIds = data.categoria as unknown as number;
    const atoLegalExistentes = await this.atoLegalService.findOne(atoLegalIds);

    const livrotomboIds = data.categoria as unknown as number[];
    const livrotomboIdsExistentes =
      await this.livroTomboService.findByIds(livrotomboIds);

    // const distrito = data.distrito as unknown as number;
    // const distritoIdsExistentes = await this.distritoService.findOne(distrito);

    console.log(data);

    const novoProcesso = this.processoRepository.create({
      ...data,
      // distrito: distritoIdsExistentes,
      livros: livrotomboIdsExistentes,
      atoLegal: atoLegalExistentes,
      municipio: municipioExistentes,
      categoria: categoriaExistentes,
      classes: classesExistentes,
      subclasses: subclassesExistentes,
    });

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
