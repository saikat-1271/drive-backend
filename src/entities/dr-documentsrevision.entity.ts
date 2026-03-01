import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dr_documentsrevision')
export class DrDocumentsRevision {
  @PrimaryGeneratedColumn('increment')
  docrevid: number;

  @Column({ name: 's3filename', length: 255 })
  s3filename: string;

  @Column({ name: 'fileext', length: 10 })
  fileext: string;

  @Column({ name: 'filesize', type: 'bigint' })
  filesize: number;

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

  @Column({ name: 'revisionnumber' })
  revisionnumber: number;

  @Column({ type: 'jsonb', name: 'extradata', nullable: true })
  extradata: Record<string, any>;
}
