import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { SchoolEntity } from 'src/infrastructure/db/entity';
import {
  ISchoolRepository,
  CreateSchool,
  School,
  SchoolMapper,
} from 'src/domain/school';

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

    return SchoolMapper.of(entity.id, entity.name, entity.region);
  }

  public async findByIds(ids: number[]): Promise<School[]> {
    const entities = await this.schoolRepository.find({
      where: { id: In(ids) },
    });
    return entities.map((entity) =>
      SchoolMapper.of(entity.id, entity.name, entity.region),
    );
  }

  public async save(school: CreateSchool): Promise<School> {
    const entity = await this.schoolRepository.save(
      this.schoolRepository.create({
        name: school.getName(),
        region: school.getRegion(),
      }),
    );

    return SchoolMapper.of(entity.id, entity.name, entity.region);
  }
}
