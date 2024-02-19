import { Feed } from './feed';

export class FeedMapper {
  public static of(
    id: number,
    schoolId: number,
    title: string,
    content: string,
    createdAt: Date,
  ): Feed {
    return new Feed(id, schoolId, title, content, createdAt);
  }
}
