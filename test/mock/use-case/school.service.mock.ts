import { SchoolService } from 'src/use-case/school/service';
import { MockClassType } from '../mock-class.type';

export class SchoolServiceMock implements MockClassType<SchoolService> {
  getById = jest.fn();
  create = jest.fn();
}
