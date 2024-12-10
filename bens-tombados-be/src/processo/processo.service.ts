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
import { DistritoService } from 'src/distrito/distrito.service';

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
    private readonly distritoService: DistritoService,
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

    const livrotomboIds = data.livros as unknown as number[];
    const livrotomboIdsExistentes =
      await this.livroTomboService.findByIds(livrotomboIds);

    const distrito = data.distrito as unknown as number;
    const distritoIdsExistentes = await this.distritoService.findOne(distrito);

    const novoProcesso = this.processoRepository.create({
      ...data,
      distrito: distritoIdsExistentes,
      livros: livrotomboIdsExistentes,
      atoLegal: atoLegalExistentes,
      municipio: municipioExistentes,
      categoria: categoriaExistentes,
      classes: classesExistentes,
      subclasses: subclassesExistentes,
    });

    return this.processoRepository.save(novoProcesso);
  }

  async findAll(): Promise<any[]> {
    return this.processoRepository.query('SELECT * FROM ViewProcessosCompleta');
  }

  async findOne(id: number): Promise<Processo> {
    return this.processoRepository.findOneBy({ idProcesso: id });
  }

  async update(id: number, data: Partial<Processo>): Promise<Processo> {
    const processo = await this.processoRepository.findOne({
      where: { idProcesso: id },
      relations: [
        'classes',
        'subclasses',
        'livros',
        'categoria',
        'municipio',
        'distrito',
        'atoLegal',
      ],
    });

    console.log(data);
    if (!processo) {
      throw new Error('Processo não encontrado');
    }

    if (data.processoNome !== undefined)
      processo.processoNome = data.processoNome;
    if (data.processoAno !== undefined) processo.processoAno = data.processoAno;
    if (data.denominacao !== undefined) processo.denominacao = data.denominacao;
    if (data.denominacaoCompleta !== undefined)
      processo.denominacaoCompleta = data.denominacaoCompleta;

    if (data.classes) {
      const classes = await this.classeService.findByIds(
        data.classes as unknown as number[],
      );
      processo.classes = classes;
    }

    if (data.subclasses) {
      const subclasses = await this.subclasseService.findByIds(
        data.subclasses as unknown as number[],
      );
      processo.subclasses = subclasses;
    }

    if (data.livros) {
      const livros = await this.livroTomboService.findByIds(
        data.livros as unknown as number[],
      );
      processo.livros = livros;
    }

    if (data.categoria) {
      const categoria =
        typeof data.categoria === 'number'
          ? await this.categoriaService.findById(data.categoria)
          : data.categoria;
      if (!categoria) throw new Error('Categoria não encontrada');
      console.log(categoria);
      processo.categoria = categoria;
    }

    if (data.municipio) {
      const municipio =
        typeof data.municipio === 'number'
          ? await this.municipioService.findOne(data.municipio)
          : data.municipio;
      if (!municipio) throw new Error('Município não encontrado');
      processo.municipio = municipio;
    }

    if (data.distrito) {
      const distrito =
        data.distrito && typeof data.distrito === 'number'
          ? await this.distritoService.findOne(data.distrito)
          : data.distrito || null;
      if (data.distrito && !distrito)
        throw new Error('Distrito não encontrado');
      processo.distrito = distrito;
    }

    if (data.atoLegal) {
      const atoLegal =
        typeof data.atoLegal === 'number'
          ? await this.atoLegalService.findOne(data.atoLegal)
          : data.atoLegal;
      if (!atoLegal) throw new Error('Ato Legal não encontrado');
      processo.atoLegal = atoLegal;
    }

    return this.processoRepository.save(processo);
  }

  async delete(id: number): Promise<void> {
    // Remover registros relacionados na tabela LogProcesso
    await this.processoRepository.query(
      `DELETE FROM LogProcesso WHERE idProcesso = ?`,
      [id],
    );

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
