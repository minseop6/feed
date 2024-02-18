import { BaseException } from './base.exception';

export class SchoolNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
