import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column({ length: 50 })
  nomeCategoria: string;

  @Column({ length: 255, nullable: true })
  descricao: string;
}
