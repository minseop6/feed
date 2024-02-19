import { SchoolMapping } from './school-mapping';

export interface ISchoolMappingRepository {
  findOne(accountId: number, schoolId: number): Promise<SchoolMapping | null>;
  findByAccountId(accountId: number): Promise<SchoolMapping[]>;
  create(accountId: number, schoolId: number): Promise<SchoolMapping>;
  delete(accountId: number, schoolId: number): Promise<void>;
}
