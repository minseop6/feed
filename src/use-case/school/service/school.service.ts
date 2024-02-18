import { Injectable } from '@nestjs/common';

import { AccountService } from 'src/use-case/account/service';
import { AccountType } from 'src/type/enum/account-type.enum';
import { Transactional } from 'typeorm-transactional';
import { CreateSchoolDto, SchoolDto } from 'src/type/dto/school.dto';
import {
  SchoolMappingRepository,
  SchoolRepository,
} from 'src/infrastructure/db/repository';
import { CreateSchool } from 'src/domain/school/school';

@Injectable()
export class SchoolService {
  constructor(
    private readonly accountService: AccountService,
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolMappingRepository: SchoolMappingRepository,
  ) {}

  public async getById(
    accountId: number,
    schoolId: number,
  ): Promise<SchoolDto> {
    await this.accountService.getById(accountId);

    const school = await this.schoolRepository.findById(schoolId);
    if (!school) {
      throw new Error(`School is not exists. schoolId: ${schoolId}`);
    }

    return SchoolDto.from(school);
  }

  @Transactional()
  public async create(
    accountId: number,
    school: CreateSchoolDto,
  ): Promise<SchoolDto> {
    const account = await this.accountService.getById(accountId);
    if (account.type !== AccountType.ADMIN) {
      throw new Error('Account type must be admin.');
    }

    const createdSchool = await this.schoolRepository.save(
      new CreateSchool(school.name, school.region),
    );
    await this.schoolMappingRepository.create(accountId, createdSchool.getId());

    return SchoolDto.from(createdSchool);
  }
}
