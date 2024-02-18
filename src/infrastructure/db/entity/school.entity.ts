import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SchoolMappingEntity } from './school-mapping.entity';
import { FeedEntity } from './feed.entity';

@Entity('school')
export class SchoolEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'name', type: 'varchar', length: 45, nullable: false })
  public name: string;

  @Column({ name: 'region', type: 'varchar', length: 45, nullable: false })
  public region: string;

  @OneToMany(() => SchoolMappingEntity, (schoolMapping) => schoolMapping.school)
  public schoolMappings: SchoolMappingEntity[];

  @OneToMany(() => FeedEntity, (feed) => feed.school)
  public feeds: FeedEntity[];
}
