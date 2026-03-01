import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dr_documents')
export class DrDocuments {
  @PrimaryGeneratedColumn('increment')
  docid: number;

  @Column({ length: 255 })
  docname: string;

  @Column({ name: 'folderid' })
  folderid: number;

  @Column({ name: 'lastrevid' })
  lastrevid: number;

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

  @Column({ name: 'searchtag', length: 500, nullable: true })
  searchtag: string;

  @Column({ type: 'jsonb', name: 'extradata', nullable: true })
  extradata: Record<string, any>;
}
