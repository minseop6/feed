import { School } from './school';

export class SchoolMapper {
  public static of(id: number, name: string, region: string): School {
    return new School(id, name, region);
  }
}
