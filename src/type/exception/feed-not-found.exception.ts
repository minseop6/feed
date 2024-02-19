import { BaseException } from './base.exception';

export class FeedNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
