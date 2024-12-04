import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subclasse } from 'src/subclasse/entities/subclasse.entity';

@Entity('Classe')
export class Classe {
  @PrimaryGeneratedColumn()
  idClasse: number;

  @Column({ length: 100 })
  nomeClasse: string;

  @OneToMany(() => Subclasse, (subclasse) => subclasse.classe, {
    cascade: true,
  })
  subclasses: Subclasse[];
}
