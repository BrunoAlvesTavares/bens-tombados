import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('livrotombo')
export class LivroTombo {
  @PrimaryGeneratedColumn()
  idLivro: number;

  @Column({ length: 50, unique: true })
  nomeLivro: string;
}
