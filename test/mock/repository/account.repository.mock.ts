import { IAccountRepository } from 'src/domain/account';

export class AccountRepositoryMock implements IAccountRepository {
  findById = jest.fn();
  findByEmail = jest.fn();
  create = jest.fn();
}
