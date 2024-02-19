import { BaseException } from './base.exception';

export class InvalidSchoolMappingException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
