import { AccountService } from 'src/use-case/account/service';
import { MockClassType } from '../mock-class.type';

export class AccountServiceMock implements MockClassType<AccountService> {
  getById = jest.fn();
  create = jest.fn();
}
