import { FeedService } from 'src/use-case/feed';
import { MockClassType } from '../mock-class.type';

export class FeedServiceMock implements MockClassType<FeedService> {
  getBySchoolId = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
}
