import { Processo } from 'src/processo/entities/processo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('LogProcesso') // Nome da tabela no banco de dados
export class LogProcesso {
  @PrimaryGeneratedColumn()
  idLog: number;

  @Column()
  idProcesso: number;

  @Column()
  acao: string;

  @Column({ type: 'timestamp' })
  dataHoraLog: Date;

  @Column({ nullable: true })
  descricao: string;

  @ManyToOne(() => Processo)
  @JoinColumn({ name: 'idProcesso' }) // Chave estrangeira para o processo
  processo: Processo;
}
