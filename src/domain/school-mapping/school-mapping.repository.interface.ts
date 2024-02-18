import { SchoolMapping } from './school-mapping';

export interface ISchoolMappingRepository {
  findOne(accountId: number, schoolId: number): Promise<SchoolMapping | null>;
  create(accountId: number, schoolId: number): Promise<SchoolMapping>;
  delete(accountId: number, schoolId: number): Promise<void>;
}
