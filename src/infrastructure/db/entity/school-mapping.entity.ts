import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { AccountEntity } from './account.entity';
import { SchoolEntity } from './school.entity';

@Entity('school_mapping')
export class SchoolMappingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'school_id', type: 'int', nullable: false })
  public schoolId: number;

  @Column({ name: 'account_id', type: 'int', nullable: false })
  public accountId: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  public deletedAt?: Date;

  @ManyToOne(() => AccountEntity, (account) => account.schoolMappings)
  @JoinColumn({ name: 'account_id' })
  public account: AccountEntity;

  @ManyToOne(() => SchoolEntity, (school) => school.schoolMappings)
  @JoinColumn({ name: 'school_id' })
  public school: SchoolEntity;
}
