import { SchoolService } from 'src/use-case/school/service';
import { SchoolController } from './school.controller';
import { Test } from '@nestjs/testing';
import { SchoolServiceMock } from 'test/mock/use-case/school.service.mock';
import { SchoolDto } from 'src/type/dto/school.dto';
import { School } from 'src/domain/school';

describe('SchoolController', () => {
  let schoolController: SchoolController;
  let schoolService: SchoolService;
  const mockSchool = SchoolDto.from(new School(1, 'test', 'test region'));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [
        {
          provide: SchoolService,
          useClass: SchoolServiceMock,
        },
      ],
    }).compile();

    schoolController = moduleRef.get(SchoolController);
    schoolService = moduleRef.get(SchoolService);
  });

  describe('get by id', () => {
    test('should return school', async () => {
      jest.spyOn(schoolService, 'getById').mockResolvedValue(mockSchool);
      const school = await schoolController.getById(1, 1);

      expect(school).toBeDefined();
      expect(school).toBeInstanceOf(SchoolDto);
    });
  });

  describe('getSubscriptions', () => {
    test('should return subscriptions', async () => {
      jest
        .spyOn(schoolService, 'getSubscriptions')
        .mockResolvedValue([mockSchool]);
      const schools = await schoolController.getSubscriptions(1);

      expect(schools).toBeDefined();
      expect(schools).toBeInstanceOf(Array);
      expect(schools[0]).toBeInstanceOf(SchoolDto);
    });
  });

  describe('create', () => {
    test('should be create successfully', async () => {
      jest.spyOn(schoolService, 'create').mockResolvedValue(mockSchool);
      const school = await schoolController.create(1, {
        name: 'test',
        region: 'test region',
      });

      expect(school).toBeDefined();
      expect(school).toBeInstanceOf(SchoolDto);
    });
  });

  describe('subscribe', () => {
    test('should be subscribe successfully', async () => {
      jest.spyOn(schoolService, 'subscribe').mockResolvedValue(mockSchool);
      const school = await schoolController.subscribe(1, 1);

      expect(school).toBeDefined();
      expect(school).toBeInstanceOf(SchoolDto);
    });
  });

  describe('unsubscribe', () => {
    test('should be unsubscribe successfully', async () => {
      jest.spyOn(schoolService, 'unsubscribe').mockResolvedValue();
      const result = await schoolController.unsubscribe(1, 1);

      expect(result).toBeUndefined();
    });
  });
});
