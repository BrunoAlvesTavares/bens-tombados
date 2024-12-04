import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Municipio } from 'src/municipio/entities/municipio.entity';

@Entity('Distrito')
export class Distrito {
  @PrimaryGeneratedColumn()
  idDistrito: number;

  @Column({ length: 100 })
  nomeDistrito: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.idMunicipio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idMunicipio' })
  municipio: Municipio;
}
