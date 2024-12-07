import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Municipio } from 'src/municipio/entities/municipio.entity';
import { AtoLegal } from 'src/ato-legal/entities/ato-legal.entity';
import { Classe } from 'src/classe/entities/classe.entity';
import { LivroTombo } from 'src/livro-tombo/entities/livro-tombo.entity';
import { Distrito } from 'src/distrito/entities/distrito.entity';
import { Subclasse } from 'src/subclasse/entities/subclasse.entity';

@Entity()
export class Processo {
  @PrimaryGeneratedColumn()
  idProcesso: number;

  @Column({ length: 100 })
  processoNome: string;

  @Column('int')
  processoAno: number;

  @Column({ length: 255 })
  denominacao: string;

  @Column('text', { nullable: true })
  denominacaoCompleta: string;

  @ManyToOne(() => Categoria, { eager: true })
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @ManyToOne(() => Municipio, { eager: true })
  @JoinColumn({ name: 'idMunicipio' })
  municipio: Municipio;

  @ManyToOne(() => Distrito, { eager: true, nullable: true })
  @JoinColumn({ name: 'idDistrito' })
  distrito: Distrito;

  @ManyToOne(() => AtoLegal, { eager: true })
  @JoinColumn({ name: 'idAtoLegal' })
  atoLegal: AtoLegal;

  @ManyToMany(() => Classe, { cascade: true, eager: true })
  @JoinTable({
    name: 'Processo_Classe',
    joinColumn: { name: 'idProcesso', referencedColumnName: 'idProcesso' },
    inverseJoinColumn: { name: 'idClasse', referencedColumnName: 'idClasse' },
  })
  classes: Classe[];

  @ManyToMany(() => LivroTombo, { cascade: true, eager: true })
  @JoinTable({
    name: 'Processo_Livro',
    joinColumn: { name: 'idProcesso', referencedColumnName: 'idProcesso' },
    inverseJoinColumn: { name: 'idLivro', referencedColumnName: 'idLivro' },
  })
  livros: LivroTombo[];

  @ManyToMany(() => Subclasse, { cascade: true, eager: true })
  @JoinTable({
    name: 'Processo_Subclasse',
    joinColumn: { name: 'idProcesso', referencedColumnName: 'idProcesso' },
    inverseJoinColumn: {
      name: 'idSubclasse',
      referencedColumnName: 'idSubclasse',
    },
  })
  subclasses: Subclasse[];
}
