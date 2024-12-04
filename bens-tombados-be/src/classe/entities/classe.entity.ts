import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Classe {
  @PrimaryGeneratedColumn()
  idClasse: number;

  @Column({ length: 100 })
  nomeClasse: string;
  subclasses: any;
}
