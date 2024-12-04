import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Municipio {
  @PrimaryGeneratedColumn()
  idMunicipio: number;

  @Column({ length: 100 })
  nomeMunicipio: string;
}
