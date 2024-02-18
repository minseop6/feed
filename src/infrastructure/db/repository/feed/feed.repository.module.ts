import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedEntity } from '../../entity';
import { FeedRepository } from './feed.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [FeedRepository],
  exports: [FeedRepository],
})
export class FeedRepositoryModule {}
