import { SchoolMapping } from './school-mapping';

export class SchoolMappingMapper {
  public static of(
    schoolId: number,
    accountId: number,
    deletedAt?: Date,
  ): SchoolMapping {
    return new SchoolMapping(schoolId, accountId, deletedAt);
  }
}
