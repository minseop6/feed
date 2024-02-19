import { Test } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountType } from 'src/type/enum/account-type.enum';
import { AccountNotFoundException } from 'src/type/exception/account-not-found.exception';
import { DuplicateEmailException } from 'src/type/exception/duplicate-email.exception';
import { AccountRepository } from 'src/infrastructure/db/repository';
import { Account } from 'src/domain/account/account';
import { AccountDto } from 'src/type/dto/account.dto';
import { AccountRepositoryMock } from 'test/mock/repository/account.repository.mock';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;
  const mockAccount = new Account(
    1,
    AccountType.USER,
    'test@test.com',
    'test',
    '1234',
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: 'AccountRepository', useClass: AccountRepositoryMock },
      ],
    }).compile();

    accountService = moduleRef.get(AccountService);
    accountRepository = moduleRef.get('AccountRepository');
  });

  describe('getById', () => {
    test('should return account', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(mockAccount);
      const account = await accountService.getById(1);

      expect(account).toBeDefined();
      expect(account).toBeInstanceOf(AccountDto);
    });

    test('should throw account is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      expect(accountService.getById(1)).rejects.toThrow(
        AccountNotFoundException,
      );
    });
  });

  describe('create', () => {
    const email = 'test@test.com';
    const name = 'test';
    const password = '1234';
    const type = AccountType.USER;

    test('should return account', async () => {
      jest.spyOn(accountRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(accountRepository, 'create').mockResolvedValue(mockAccount);

      const account = await accountService.create({
        type,
        email,
        name,
        password,
      });

      expect(account).toBeDefined();
      expect(account).toBeInstanceOf(AccountDto);
      expect(account.email).toBe(email);
      expect(account.name).toBe(name);
      expect(account.type).toBe(type);
    });

    test('should throw duplicate email exception', async () => {
      jest
        .spyOn(accountRepository, 'findByEmail')
        .mockResolvedValue(mockAccount);

      expect(
        accountService.create({
          type,
          email,
          name,
          password,
        }),
      ).rejects.toThrow(DuplicateEmailException);
    });
  });
});
