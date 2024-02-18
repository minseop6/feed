import { BaseException } from './base.exception';

export class AccountNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
