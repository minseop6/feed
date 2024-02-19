import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedEntity } from '../../entity';
import { FeedRepository } from './feed.repository';

const repository = {
  provide: 'FeedRepository',
  useClass: FeedRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [repository],
  exports: [repository],
})
export class FeedRepositoryModule {}
