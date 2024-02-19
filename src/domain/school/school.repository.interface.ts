import { CreateSchool, School } from './school';

export interface ISchoolRepository {
  findById(id: number): Promise<School | null>;
  findByIds(ids: number[]): Promise<School[]>;
  save(school: CreateSchool): Promise<School>;
}
