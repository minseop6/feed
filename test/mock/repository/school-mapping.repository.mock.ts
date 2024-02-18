import { ISchoolMappingRepository } from 'src/domain/school-mapping';

export class SchoolMappingRepositoryMock implements ISchoolMappingRepository {
  findOne = jest.fn();
  create = jest.fn();
  delete = jest.fn();
}
