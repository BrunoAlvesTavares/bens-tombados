import { Classe } from 'src/classe/entities/classe.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Subclasse {
  @PrimaryGeneratedColumn()
  idSubclasse: number;

  @Column({ length: 100 })
  nomeSubclasse: string;

  @ManyToOne(() => Classe, (classe) => classe.subclasses, { nullable: false })
  @JoinColumn({ name: 'idClasse' })
  classe: Classe;
}
