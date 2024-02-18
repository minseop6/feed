import { Account, CreateAccount } from './account';

export interface IAccountRepository {
  findById(id: number): Promise<Account | null>;
  findByEmail(email: string): Promise<Account | null>;
  create(input: CreateAccount): Promise<Account>;
}
