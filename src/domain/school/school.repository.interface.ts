import { CreateSchool, School } from './school';

export interface ISchoolRepository {
  findById(id: number): Promise<School | null>;
  save(school: CreateSchool): Promise<School>;
}
