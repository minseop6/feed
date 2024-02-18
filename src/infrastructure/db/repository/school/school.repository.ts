import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SchoolEntity } from 'src/infrastructure/db/entity';
import { ISchoolRepository, CreateSchool, School } from 'src/domain/school';

@Injectable()
export class SchoolRepository implements ISchoolRepository {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>,
  ) {}

  public async findById(id: number): Promise<School | null> {
    const entity = await this.schoolRepository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }

    return new School(entity.id, entity.name, entity.region);
  }

  public async save(school: CreateSchool): Promise<School> {
    const entity = await this.schoolRepository.save(
      this.schoolRepository.create({ ...school }),
    );

    return new School(entity.id, entity.name, entity.region);
  }
}
