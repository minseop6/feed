import { Module } from '@nestjs/common';
import {
  AccountRepositoryModule,
  FeedRepositoryModule,
  SchoolMappingRepositoryModule,
} from 'src/infrastructure/db/repository';
import { FeedService } from './feed.service';

@Module({
  imports: [
    FeedRepositoryModule,
    SchoolMappingRepositoryModule,
    AccountRepositoryModule,
  ],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {}
