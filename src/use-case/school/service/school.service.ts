import { Inject, Injectable } from '@nestjs/common';

import { AccountType } from 'src/type/enum/account-type.enum';
import { Transactional } from 'typeorm-transactional';
import { CreateSchoolDto, SchoolDto } from 'src/type/dto/school.dto';
import { CreateSchool } from 'src/domain/school/school';
import { SchoolNotFoundException } from 'src/type/exception/school-not-found.exception';
import { InvalidAccountException } from 'src/type/exception/invalid-account.exception';
import { AccountNotFoundException } from 'src/type/exception/account-not-found.exception';
import { Account, IAccountRepository } from 'src/domain/account';
import { ISchoolRepository } from 'src/domain/school';
import { ISchoolMappingRepository } from 'src/domain/school-mapping';
import { InvalidSchoolMappingException } from 'src/type/exception';

@Injectable()
export class SchoolService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('SchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('SchoolMappingRepository')
    private readonly schoolMappingRepository: ISchoolMappingRepository,
  ) {}

  public async getById(
    accountId: number,
    schoolId: number,
  ): Promise<SchoolDto> {
    await this.getAccount(accountId);

    const school = await this.schoolRepository.findById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException(
        `School is not exists. schoolId: ${schoolId}`,
      );
    }

    return SchoolDto.from(school);
  }

  public async getSubscriptions(accountId: number): Promise<SchoolDto[]> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AccountNotFoundException(
        `Account is not exists. accountId: ${accountId}`,
      );
    }

    const schoolMappings =
      await this.schoolMappingRepository.findByAccountId(accountId);

    const schools = await this.schoolRepository.findByIds(
      schoolMappings.map((mapping) => mapping.getSchoolId()),
    );

    return schools.map(SchoolDto.from);
  }

  @Transactional()
  public async create(
    accountId: number,
    school: CreateSchoolDto,
  ): Promise<SchoolDto> {
    const account = await this.getAccount(accountId);
    if (account.getType() !== AccountType.ADMIN) {
      throw new InvalidAccountException('Account type must be admin.');
    }

    const createdSchool = await this.schoolRepository.save(
      new CreateSchool(school.name, school.region),
    );
    await this.schoolMappingRepository.create(accountId, createdSchool.getId());

    return SchoolDto.from(createdSchool);
  }

  public async subscribe(
    accountId: number,
    schoolId: number,
  ): Promise<SchoolDto> {
    await this.getAccount(accountId);
    const school = await this.schoolRepository.findById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException(
        `School is not exists. schoolId: ${schoolId}`,
      );
    }
    const existsSchoolMapping = await this.schoolMappingRepository.findOne(
      accountId,
      schoolId,
    );
    if (existsSchoolMapping) {
      throw new InvalidSchoolMappingException(
        'School mapping is already exists.',
      );
    }
    await this.schoolMappingRepository.create(accountId, school.getId());
    return SchoolDto.from(school);
  }

  public async unsubscribe(accountId: number, schoolId: number): Promise<void> {
    await this.getAccount(accountId);
    const school = await this.schoolRepository.findById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException(
        `School is not exists. schoolId: ${schoolId}`,
      );
    }
    const existsSchoolMapping = await this.schoolMappingRepository.findOne(
      accountId,
      schoolId,
    );
    if (!existsSchoolMapping) {
      throw new InvalidSchoolMappingException('School mapping is not exists.');
    }
    await this.schoolMappingRepository.delete(accountId, school.getId());
  }

  private async getAccount(accountId: number): Promise<Account> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AccountNotFoundException(
        `Account is not exists. accountId: ${accountId}`,
      );
    }

    return account;
  }
}
