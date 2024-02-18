import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolEntity } from './school.entity';

@Entity('feed')
export class FeedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'school_id', type: 'int', nullable: false })
  public schoolId: number;

  @Column({ name: 'title', type: 'varchar', length: 45, nullable: false })
  public title: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  public content: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
  public deletedAt?: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.feeds)
  public school: SchoolEntity;
}
