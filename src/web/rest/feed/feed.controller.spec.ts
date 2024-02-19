import { Test } from '@nestjs/testing';

import { FeedService } from 'src/use-case/feed';
import { FeedController } from './feed.controller';
import { FeedServiceMock } from 'test/mock/use-case/feed.service.mock';
import { FeedDto } from 'src/type/dto/feed.dto';
import { FeedMapper } from 'src/domain/feed';

describe('FeedController', () => {
  let feedController: FeedController;
  let feedService: FeedService;
  const feedDtoMock = FeedDto.from(
    FeedMapper.of(1, 1, 'title', 'content', new Date()),
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useClass: FeedServiceMock,
        },
      ],
    }).compile();

    feedController = moduleRef.get(FeedController);
    feedService = moduleRef.get(FeedService);
  });

  describe('getBySchoolId', () => {
    test('should return feeds', async () => {
      jest
        .spyOn(feedService, 'getBySchoolId')
        .mockResolvedValue([feedDtoMock, feedDtoMock, feedDtoMock]);

      const result = await feedController.getBySchoolId(1, 1, {
        page: 1,
        take: 10,
      });
      expect(result).toBeDefined();
      expect(feedService.getBySchoolId).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    test('should be create successfully', async () => {
      jest.spyOn(feedService, 'create').mockResolvedValue(feedDtoMock);

      const result = await feedController.create(1, 1, {
        title: 'title',
        content: 'content',
      });

      expect(result).toBeDefined();
      expect(feedService.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    test('should be update successfully', async () => {
      jest.spyOn(feedService, 'update').mockResolvedValue(feedDtoMock);

      const result = await feedController.update(1, 1, 1, {
        id: 1,
        title: 'title',
        content: 'content',
      });

      expect(result).toBeDefined();
      expect(feedService.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    test('should be delete successfully', async () => {
      jest.spyOn(feedService, 'delete').mockResolvedValue(undefined);

      const result = await feedController.delete(1, 1, 1);

      expect(result).toBeUndefined();
      expect(feedService.delete).toHaveBeenCalled();
    });
  });
});
