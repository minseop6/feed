import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FeedEntity } from '../../entity';
import { IFeedRepository } from 'src/domain/feed';

export class FeedRepository implements IFeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}
}
