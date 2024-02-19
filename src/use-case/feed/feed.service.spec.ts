import { Test } from '@nestjs/testing';
import { FeedService } from '.';
import { SchoolMappingRepositoryMock } from 'test/mock/repository/school-mapping.repository.mock';
import { AccountRepositoryMock } from 'test/mock/repository/account.repository.mock';
import { FeedRepositoryMock } from 'test/mock/repository/feed.repository.mock';
import { AccountMapper, IAccountRepository } from 'src/domain/account';
import { AccountType } from 'src/type/enum/account-type.enum';
import { FeedMapper, IFeedRepository } from 'src/domain/feed';
import {
  ISchoolMappingRepository,
  SchoolMappingMapper,
} from 'src/domain/school-mapping';
import {
  AccountNotFoundException,
  FeedNotFoundException,
  InvalidAccountException,
  InvalidSchoolMappingException,
} from 'src/type/exception';
import { FeedDto } from 'src/type/dto/feed.dto';
import { InvalidFeedException } from 'src/type/exception/invalid-feed-exception';

describe('FeedService', () => {
  let feedService: FeedService;
  let feedRepository: IFeedRepository;
  let schoolMappingRepository: ISchoolMappingRepository;
  let accountRepository: IAccountRepository;

  const accountMock = AccountMapper.of(
    1,
    AccountType.ADMIN,
    'test@test.com',
    'test',
    '1234',
  );
  const userAccountMock = AccountMapper.of(
    1,
    AccountType.USER,
    'test@test.com',
    'test',
    '1234',
  );
  const feedMock = FeedMapper.of(1, 1, 'test', 'test', new Date());
  const schoolMappingMock = SchoolMappingMapper.of(1, 1);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FeedService,
        { provide: 'FeedRepository', useClass: FeedRepositoryMock },
        {
          provide: 'SchoolMappingRepository',
          useClass: SchoolMappingRepositoryMock,
        },
        { provide: 'AccountRepository', useClass: AccountRepositoryMock },
      ],
    }).compile();

    feedService = moduleRef.get(FeedService);
    feedRepository = moduleRef.get('FeedRepository');
    schoolMappingRepository = moduleRef.get('SchoolMappingRepository');
    accountRepository = moduleRef.get('AccountRepository');
  });

  describe('get by school id', () => {
    test('should return feeds', async () => {
      jest
        .spyOn(feedRepository, 'findBySchoolId')
        .mockResolvedValue([feedMock, feedMock, feedMock]);
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);

      const feeds = await feedService.getBySchoolId(1, 1, {
        page: 1,
        take: 10,
      });

      expect(feeds).toBeDefined();
      expect(feeds).toBeInstanceOf(Array);
      feeds.forEach((feed) => expect(feed).toBeInstanceOf(FeedDto));
    });

    test('should be throw account is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      expect(
        feedService.getBySchoolId(1, 1, { page: 1, take: 10 }),
      ).rejects.toThrow(AccountNotFoundException);
    });

    test('should be throw school mapping is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest.spyOn(schoolMappingRepository, 'findOne').mockResolvedValue(null);

      expect(
        feedService.getBySchoolId(1, 1, { page: 1, take: 10 }),
      ).rejects.toThrow(InvalidSchoolMappingException);
    });
  });

  describe('create', () => {
    test('should be create successfully', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'create').mockResolvedValue(feedMock);

      const feed = await feedService.create(1, 1, {
        title: 'test',
        content: 'test',
      });

      expect(feed).toBeDefined();
      expect(feed).toBeInstanceOf(FeedDto);
    });

    test('should be throw account is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      expect(
        feedService.create(1, 1, { title: 'test', content: 'test' }),
      ).rejects.toThrow(AccountNotFoundException);
    });

    test('should be throw student cannot create feed exception', async () => {
      jest
        .spyOn(accountRepository, 'findById')
        .mockResolvedValue(userAccountMock);

      expect(
        feedService.create(1, 1, { title: 'test', content: 'test' }),
      ).rejects.toThrow(InvalidAccountException);
    });

    test('should be throw school mapping is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest.spyOn(schoolMappingRepository, 'findOne').mockResolvedValue(null);

      expect(
        feedService.create(1, 1, { title: 'test', content: 'test' }),
      ).rejects.toThrow(InvalidSchoolMappingException);
    });
  });

  describe('update', () => {
    test('should be update successfully', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'findById').mockResolvedValue(feedMock);
      jest.spyOn(feedRepository, 'update').mockResolvedValue(feedMock);

      const feed = await feedService.update(1, 1, 1, {
        id: 1,
        title: 'test',
        content: 'test',
      });

      expect(feed).toBeDefined();
      expect(feed).toBeInstanceOf(FeedDto);
    });

    test('should be throw account is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      const action = feedService.update(1, 1, 1, {
        id: 1,
        title: 'test',
        content: 'test',
      });
      expect(action).rejects.toThrow(AccountNotFoundException);
    });

    test('should be throw student cannot update feed exception', async () => {
      jest
        .spyOn(accountRepository, 'findById')
        .mockResolvedValue(userAccountMock);

      const action = feedService.update(1, 1, 1, {
        id: 1,
        title: 'test',
        content: 'test',
      });
      expect(action).rejects.toThrow(InvalidAccountException);
    });

    test('should be throw school mapping is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest.spyOn(schoolMappingRepository, 'findOne').mockResolvedValue(null);

      const action = feedService.update(1, 1, 1, {
        id: 1,
        title: 'test',
        content: 'test',
      });
      expect(action).rejects.toThrow(InvalidSchoolMappingException);
    });

    test('should be throw feed is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'findById').mockResolvedValue(null);

      const action = feedService.update(1, 1, 1, {
        id: 1,
        title: 'test',
        content: 'test',
      });
      expect(action).rejects.toThrow(FeedNotFoundException);
    });

    test('should be throw feed is not exists in school exception', async () => {
      const feed = FeedMapper.of(1, 2, 'test', 'test', new Date());
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'findById').mockResolvedValue(feed);

      const action = feedService.update(1, 1, 1, {
        id: 1,
        title: 'test',
        content: 'test',
      });
      expect(action).rejects.toThrow(InvalidFeedException);
    });
  });

  describe('delete', () => {
    test('should be delete successfully', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'findById').mockResolvedValue(feedMock);
      jest.spyOn(feedRepository, 'delete').mockResolvedValue(undefined);

      await feedService.delete(1, 1, 1);
    });

    test('should be throw account is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(null);

      const action = feedService.delete(1, 1, 1);
      expect(action).rejects.toThrow(AccountNotFoundException);
    });

    test('should be throw student cannot delete feed exception', async () => {
      jest
        .spyOn(accountRepository, 'findById')
        .mockResolvedValue(userAccountMock);

      const action = feedService.delete(1, 1, 1);
      expect(action).rejects.toThrow(InvalidAccountException);
    });

    test('should be throw school mapping is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest.spyOn(schoolMappingRepository, 'findOne').mockResolvedValue(null);

      const action = feedService.delete(1, 1, 1);
      expect(action).rejects.toThrow(InvalidSchoolMappingException);
    });

    test('should be throw feed is not exists exception', async () => {
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'findById').mockResolvedValue(null);

      const action = feedService.delete(1, 1, 1);
      expect(action).rejects.toThrow(FeedNotFoundException);
    });

    test('should be throw feed is not exists in school exception', async () => {
      const feed = FeedMapper.of(1, 2, 'test', 'test', new Date());
      jest.spyOn(accountRepository, 'findById').mockResolvedValue(accountMock);
      jest
        .spyOn(schoolMappingRepository, 'findOne')
        .mockResolvedValue(schoolMappingMock);
      jest.spyOn(feedRepository, 'findById').mockResolvedValue(feed);

      const action = feedService.delete(1, 1, 1);
      expect(action).rejects.toThrow(InvalidFeedException);
    });
  });
});
