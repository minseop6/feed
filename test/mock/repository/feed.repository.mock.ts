import { IFeedRepository } from 'src/domain/feed';

export class FeedRepositoryMock implements IFeedRepository {
  findById = jest.fn();
  findBySchoolId = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
}
