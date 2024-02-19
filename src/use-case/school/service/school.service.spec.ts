import {
  AccountRepository,
  SchoolMappingRepository,
  SchoolRepository,
} from 'src/infrastructure/db/repository';
import { SchoolService } from './school.service';
import { SchoolMappingRepositoryMock } from 'test/mock/repository/school-mapping.repository.mock';
import { SchoolRepositoryMock } from 'test/mock/repository/school.repository.mock';
import { Test } from '@nestjs/testing';
import { SchoolMapper } from 'src/domain/school';
import { SchoolDto } from 'src/type/dto/school.dto';
import { SchoolNotFoundException } from 'src/type/exception/school-not-found.exception';
import { AccountRepositoryMock } from 'test/mock/repository/account.repository.mock';
import { Account, AccountMapper } from 'src/domain/account';
import { AccountType } from 'src/type/enum/account-type.enum';
import { AccountNotFoundException } from 'src/type/exception/account-not-found.exception';
import { InvalidAccountException } from 'src/type/exception/invalid-account.exception';
import { SchoolMappingMapper } from 'src/domain/school-mapping';

jest.mock('typeorm-transactional', () => ({
  Transactional: jest.fn,
}));

describe('SchoolService', () => {
  let schoolService: SchoolService;
  let schoolRepository: SchoolRepository;
  let schoolMappingRepository: SchoolMappingRepository;
  let accountRepository: AccountRepository;
  const mockSchool = SchoolMapper.of(1, 'test', 'test region');
  const mockAccount = AccountMapper.of(
    1,
    AccountType.ADMIN,
    'test@test.com',
    'test',
    '1234',
  );
  const mockSchoolMapping = SchoolMappingMapper.of(1, 1);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SchoolService,
        { provide: 'SchoolRepository', useClass: SchoolRepositoryMock },
        {
          provide: 'SchoolMappingRepository',
          useClass: SchoolMappingRepositoryMock,
        },
        { provide: 'AccountRepository', useClass: AccountRepositoryMock },
      ],
    }).compile();

    schoolService = moduleRef.get(SchoolService);
    schoolRepository = moduleRef.get('SchoolRepository');
    schoolMappingRepository = moduleRef.get('SchoolMappingRepository');
    accountRepository = moduleRef.get('AccountRepository');
  });

  describe('get by id', () => {
    test('should return school', async () => {
      jest.spyOn(schoolRepository, 'findById').mockResolvedValue(mockSchool);
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);
      const school = await schoolService.getById(1, 1);

      expect(school).toBeDefined();
      expect(school).toBeInstanceOf(SchoolDto);
    });

    test('should be throw school is not exists exception', async () => {
      jest.spyOn(schoolRepository, 'findById').mockResolvedValue(null);
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);

      expect(schoolService.getById(1, 1)).rejects.toThrow(
        SchoolNotFoundException,
      );
    });

    test('should be throw account is not exists exception', async () => {
      jest.spyOn(schoolRepository, 'findById').mockResolvedValue(mockSchool);
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      expect(schoolService.getById(1, 1)).rejects.toThrow(
        AccountNotFoundException,
      );
    });
  });

  describe('get mapped list', () => {
    test('should return school list', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);
      jest
        .spyOn(schoolMappingRepository, 'findByAccountId')
        .mockResolvedValue([mockSchoolMapping, mockSchoolMapping]);
      jest
        .spyOn(schoolRepository, 'findByIds')
        .mockResolvedValue([mockSchool, mockSchool]);

      const schools = await schoolService.getMappedList(1);

      expect(schools).toBeDefined();
      expect(schools).toHaveLength(2);
      expect(schools[0]).toBeInstanceOf(SchoolDto);
    });

    test('should return empty list', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);
      jest
        .spyOn(schoolMappingRepository, 'findByAccountId')
        .mockResolvedValue([]);
      jest.spyOn(schoolRepository, 'findByIds').mockResolvedValue([]);

      const schools = await schoolService.getMappedList(1);

      expect(schools).toBeDefined();
      expect(schools).toHaveLength(0);
    });

    test('should be throw account is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      expect(schoolService.getMappedList(1)).rejects.toThrow(
        AccountNotFoundException,
      );
    });
  });

  describe('create', () => {
    test('should be create successfully', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);
      jest.spyOn(schoolRepository, 'save').mockResolvedValue(mockSchool);

      const school = await schoolService.create(1, {
        name: 'test',
        region: 'test region',
      });

      expect(school).toBeDefined();
      expect(school).toBeInstanceOf(SchoolDto);
    });
  });

  test('should be throw account is not exists exception', async () => {
    jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

    expect(
      schoolService.create(1, { name: 'test', region: 'test region' }),
    ).rejects.toThrow(AccountNotFoundException);
  });

  test('should be throw account type must be admin exception', async () => {
    jest
      .spyOn(accountRepository, 'findById')
      .mockResolvedValue(
        new Account(1, AccountType.USER, 'test@test.com', 'test', '1234'),
      );

    expect(
      schoolService.create(1, { name: 'test', region: 'test region' }),
    ).rejects.toThrow(InvalidAccountException);
  });
});
