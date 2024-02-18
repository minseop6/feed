import { Test } from '@nestjs/testing';
import { AccountType } from 'src/type/enum/account-type.enum';
import { AccountService } from 'src/use-case/account/service';
import { AccountController } from './account.controller';
import { AccountDto } from 'src/type/dto/account.dto';

const mockAccountService = () => ({
  getById: jest.fn(),
  create: jest.fn(),
});

describe('accountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;
  const mockAccount: AccountDto = {
    id: 1,
    type: AccountType.USER,
    email: 'test@test.com',
    name: 'test',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [{ provide: AccountService, useFactory: mockAccountService }],
    }).compile();

    accountController = moduleRef.get(AccountController);
    accountService = moduleRef.get(AccountService);
  });

  describe('getById', () => {
    test('should return user', async () => {
      jest.spyOn(accountService, 'getById').mockResolvedValue(mockAccount);

      const result = await accountController.getById(1);
      expect(result).toBeDefined();
      expect(accountService.getById).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    test('should be create successfully', async () => {
      jest.spyOn(accountService, 'create').mockResolvedValue(mockAccount);

      const result = await accountController.create({
        email: 'test@test.com',
        name: 'test',
        password: '1234',
        type: AccountType.USER,
      });

      expect(result).toBeDefined();
      expect(accountService.create).toHaveBeenCalled();
    });
  });
});
