import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('f_folderhirerchy')
export class FolderHirerchy {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  pathid: string;

  @Column()
  pathname: string;

  @Column({ name: 'folderid' })
  level: number;

  @Column({ name: 'lastrevid' })
  folderid: number;

  @Column({ name: 'isdelete', default: false })
  isdelete: boolean;

  @Column({ name: 'createdy' })
  createdy: number;

  @Column({ name: 'modifyby' })
  modifyby: number;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'modifydate' })
  modifydate: Date;

  @Column({ type: 'jsonb', name: 'extradata', nullable: true })
  extradata: Record<string, any>;
}
