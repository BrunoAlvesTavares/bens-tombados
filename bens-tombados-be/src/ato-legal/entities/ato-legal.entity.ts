import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('AtoLegal')
export class AtoLegal {
  @PrimaryGeneratedColumn()
  idAtoLegal: number;

  @Column({ length: 50 })
  numeroDecreto: string;

  @Column('date')
  dataDecreto: Date;
}
