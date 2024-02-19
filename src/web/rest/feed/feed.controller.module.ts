import { Module } from '@nestjs/common';
import { FeedModule } from 'src/use-case/feed';
import { FeedController } from './feed.controller';

@Module({
  imports: [FeedModule],
  controllers: [FeedController],
})
export class FeedControllerModule {}
