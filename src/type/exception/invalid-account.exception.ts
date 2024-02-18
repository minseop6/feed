import { BaseException } from './base.exception';

export class InvalidAccountException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
