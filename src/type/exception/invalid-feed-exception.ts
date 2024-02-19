import { BaseException } from './base.exception';

export class InvalidFeedException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
