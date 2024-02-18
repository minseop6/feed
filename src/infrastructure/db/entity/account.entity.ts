import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AccountType } from 'src/type/enum/account-type.enum';
import { SchoolMappingEntity } from './school-mapping.entity';

@Entity('account')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
    nullable: false,
  })
  public type: AccountType;

  @Column({ name: 'name', type: 'varchar', length: 45, nullable: false })
  public name: string;

  @Column({ name: 'email', type: 'varchar', length: 45, nullable: false })
  public email: string;

  @Column({ name: 'password', type: 'varchar', length: 45, nullable: false })
  public password: string;

  @OneToMany(
    () => SchoolMappingEntity,
    (schoolMapping) => schoolMapping.account,
  )
  public schoolMappings: SchoolMappingEntity[];
}
