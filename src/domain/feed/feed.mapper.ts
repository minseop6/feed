import { Feed } from './feed';

export class FeedMapper {
  public static of(id: number, title: string, content: string): Feed {
    return new Feed(id, title, content);
  }
}
