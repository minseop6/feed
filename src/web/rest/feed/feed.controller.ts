import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateFeedDto,
  FeedDto,
  FeedQueryDto,
  UpdateFeedDto,
} from 'src/type/dto/feed.dto';
import { FeedService } from 'src/use-case/feed';

@Controller('accounts/:accountId')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/schools/:schoolId/feeds')
  public async getBySchoolId(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Query() query: FeedQueryDto,
  ): Promise<FeedDto[]> {
    return this.feedService.getBySchoolId(accountId, schoolId, query);
  }

  @Post('/schools/:schoolId/feeds')
  public async create(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Body() input: CreateFeedDto,
  ): Promise<FeedDto> {
    return this.feedService.create(accountId, schoolId, input);
  }

  @Put('/schools/:schoolId/feeds/:feedId')
  public async update(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body() input: UpdateFeedDto,
  ): Promise<FeedDto> {
    return this.feedService.update(accountId, schoolId, feedId, input);
  }

  @Delete('/schools/:schoolId/feeds/:feedId')
  public async delete(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<void> {
    return this.feedService.delete(accountId, schoolId, feedId);
  }
}
