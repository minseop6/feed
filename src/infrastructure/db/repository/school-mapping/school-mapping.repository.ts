import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SchoolMappingEntity } from '../../entity';
import {
  ISchoolMappingRepository,
  SchoolMapping,
  SchoolMappingMapper,
} from 'src/domain/school-mapping';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolMappingRepository implements ISchoolMappingRepository {
  constructor(
    @InjectRepository(SchoolMappingEntity)
    private readonly schoolMappingRepository: Repository<SchoolMappingEntity>,
  ) {}

  public async findOne(
    accountId: number,
    schoolId: number,
  ): Promise<SchoolMapping | null> {
    const entity = await this.schoolMappingRepository.findOne({
      where: {
        accountId,
        schoolId,
      },
    });

    if (!entity) {
      return null;
    }

    return SchoolMappingMapper.of(
      entity.schoolId,
      entity.accountId,
      entity.deletedAt,
    );
  }

  public async create(
    accountId: number,
    schoolId: number,
  ): Promise<SchoolMapping> {
    const entity = this.schoolMappingRepository.create({
      accountId,
      schoolId,
    });

    await this.schoolMappingRepository.save(entity);

    return SchoolMappingMapper.of(
      entity.schoolId,
      entity.accountId,
      entity.deletedAt,
    );
  }

  public async delete(accountId: number, schoolId: number): Promise<void> {
    await this.schoolMappingRepository.delete({
      accountId,
      schoolId,
    });
  }
}
