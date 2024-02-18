import { BaseException } from './base.exception';

export class DuplicateEmailException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
