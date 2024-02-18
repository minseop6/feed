import { AccountType } from 'src/type/enum/account-type.enum';
import { Account } from './account';

export class AccountMapper {
  public static of(
    id: number,
    type: AccountType,
    email: string,
    name: string,
    password: string,
  ): Account {
    return new Account(id, type, email, name, password);
  }
}
