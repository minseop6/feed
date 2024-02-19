import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { FeedEntity } from '../../entity';
import { CreateFeed, Feed, FeedMapper, IFeedRepository } from 'src/domain/feed';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedRepository implements IFeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  public async findById(feedId: number): Promise<Feed | null> {
    const entity = await this.feedRepository.findOne({
      where: {
        id: feedId,
        deletedAt: IsNull(),
      },
    });

    if (!entity) {
      return null;
    }

    return FeedMapper.of(
      entity.id,
      entity.schoolId,
      entity.title,
      entity.content,
      entity.createdAt,
    );
  }

  public async findBySchoolId(
    schoolId: number,
    page = 0,
    take = 10,
    from?: Date,
    to?: Date,
  ): Promise<Feed[]> {
    const builder = this.feedRepository
      .createQueryBuilder('feed')
      .where('feed.schoolId = :schoolId', { schoolId })
      .andWhere('feed.deletedAt IS NULL')
      .skip(page * take)
      .take(take)
      .orderBy('feed.id', 'DESC');

    if (from) {
      builder.andWhere('feed.createdAt >= :from', { from });
    }
    if (to) {
      builder.andWhere('feed.createdAt <= :to', { to });
    }

    const feeds = await builder.getMany();

    return feeds.map((feed) =>
      FeedMapper.of(
        feed.id,
        feed.schoolId,
        feed.title,
        feed.content,
        feed.createdAt,
      ),
    );
  }

  public async create(input: CreateFeed): Promise<Feed> {
    const entity = await this.feedRepository.save(
      this.feedRepository.create({
        schoolId: input.getSchoolId(),
        title: input.getTitle(),
        content: input.getContent(),
      }),
    );

    return FeedMapper.of(
      entity.id,
      entity.schoolId,
      entity.title,
      entity.content,
      entity.createdAt,
    );
  }

  public async update(input: Feed): Promise<Feed> {
    const entity = await this.feedRepository.save(
      this.feedRepository.create({
        id: input.getId(),
        schoolId: input.getSchoolId(),
        title: input.getTitle(),
        content: input.getContent(),
      }),
    );

    return FeedMapper.of(
      entity.id,
      entity.schoolId,
      entity.title,
      entity.content,
      entity.createdAt,
    );
  }

  public async delete(id: number): Promise<void> {
    await this.feedRepository.softDelete(id);
  }
}
