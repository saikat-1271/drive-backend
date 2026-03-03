import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('m_config')
export class Config {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  configkey: string;

  @Column({ length: 255 })
  configvalue: string;

  @Column({ name: 'createdy' })
  createdy: number;

  @Column({ name: 'modifyby' })
  modifyby: number;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'modifydate' })
  modifydate: Date;
}
