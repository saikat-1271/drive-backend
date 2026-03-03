import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('f_folder')
export class Folder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ name: 'folderid' })
  parentfolderid: number;

  @Column({ name: 'lastrevid' })
  folderhirerchyid: number;

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
