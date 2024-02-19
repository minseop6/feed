import { Inject, Injectable } from '@nestjs/common';
import { CreateFeed, IFeedRepository } from 'src/domain/feed';
import {
  CreateFeedDto,
  FeedDto,
  FeedQueryDto,
  UpdateFeedDto,
} from 'src/type/dto/feed.dto';
import { ISchoolMappingRepository } from 'src/domain/school-mapping';
import { Account, IAccountRepository } from 'src/domain/account';
import { AccountType } from 'src/type/enum/account-type.enum';
import {
  AccountNotFoundException,
  FeedNotFoundException,
  InvalidAccountException,
  InvalidSchoolMappingException,
} from 'src/type/exception';
import { InvalidFeedException } from 'src/type/exception/invalid-feed-exception';

@Injectable()
export class FeedService {
  constructor(
    @Inject('FeedRepository')
    private readonly feedRepository: IFeedRepository,
    @Inject('SchoolMappingRepository')
    private readonly schoolMappingRepository: ISchoolMappingRepository,
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  public async getBySchoolId(
    accountId: number,
    schoolId: number,
    query: FeedQueryDto,
  ): Promise<FeedDto[]> {
    await this.validateAccount(accountId);
    await this.validateMapping(accountId, schoolId);
    const feeds = await this.feedRepository.findBySchoolId(
      schoolId,
      query.page,
      query.take,
    );

    return feeds.map(FeedDto.from);
  }

  public async create(
    accountId: number,
    schoolId: number,
    input: CreateFeedDto,
  ): Promise<FeedDto> {
    await this.validateAccount(accountId);
    await this.validateMapping(accountId, schoolId);
    const createdFeed = await this.feedRepository.create(
      new CreateFeed(schoolId, input.title, input.content),
    );

    return FeedDto.from(createdFeed);
  }

  public async update(
    accountId: number,
    schoolId: number,
    feedId: number,
    input: UpdateFeedDto,
  ): Promise<FeedDto> {
    await this.validateAccount(accountId);
    await this.validateMapping(accountId, schoolId);

    const feed = await this.feedRepository.findById(feedId);
    if (!feed) {
      throw new FeedNotFoundException(`Feed is not exists. feedId: ${feedId}`);
    }
    if (feed.getSchoolId() !== schoolId) {
      throw new InvalidFeedException(
        `Feed is not exists in school. feedId: ${feedId}`,
      );
    }
    feed.updateContent(input.title, input.content);
    const updatedFeed = await this.feedRepository.update(feed);

    return FeedDto.from(updatedFeed);
  }

  public async delete(accountId: number, schoolId: number, feedId: number) {
    await this.validateAccount(accountId);
    await this.validateMapping(accountId, schoolId);

    const feed = await this.feedRepository.findById(feedId);
    if (!feed) {
      throw new FeedNotFoundException(`Feed is not exists. feedId: ${feedId}`);
    }
    if (feed.getSchoolId() !== schoolId) {
      throw new InvalidFeedException(
        `Feed is not exists in school. feedId: ${feedId}`,
      );
    }

    await this.feedRepository.delete(feedId);
  }

  private async validateMapping(
    accountId: number,
    schoolId: number,
  ): Promise<void> {
    const mapping = await this.schoolMappingRepository.findOne(
      accountId,
      schoolId,
    );
    if (!mapping) {
      throw new InvalidSchoolMappingException(
        `School is not mapped. schoolId: ${schoolId}, accountId: ${accountId}`,
      );
    }
  }

  private async validateAccount(accountId: number): Promise<Account> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AccountNotFoundException(`Account is not exists: ${accountId}`);
    }
    if (account.getType() !== AccountType.ADMIN) {
      throw new InvalidAccountException('Student cannot update feed');
    }

    return account;
  }
}
