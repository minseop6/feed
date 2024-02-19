import { CreateFeed, Feed } from './feed';

export interface IFeedRepository {
  findById(feedId: number): Promise<Feed | null>;
  findBySchoolId(
    schoolId: number,
    page?: number,
    take?: number,
    from?: Date,
    to?: Date,
  ): Promise<Feed[]>;
  create(input: CreateFeed): Promise<Feed>;
  update(input: Feed): Promise<Feed>;
  delete(feedId: number): Promise<void>;
}
