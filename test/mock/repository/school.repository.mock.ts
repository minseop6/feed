import { ISchoolRepository } from 'src/domain/school';

export class SchoolRepositoryMock implements ISchoolRepository {
  findById = jest.fn();
  save = jest.fn();
}
