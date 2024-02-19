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
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateFeedDto,
  FeedDto,
  FeedQueryDto,
  UpdateFeedDto,
} from 'src/type/dto/feed.dto';
import {
  AccountNotFoundException,
  FeedNotFoundException,
  InvalidAccountException,
} from 'src/type/exception';
import { InvalidFeedException } from 'src/type/exception/invalid-feed-exception';
import { FeedService } from 'src/use-case/feed';

@ApiTags('Feed')
@Controller('accounts/:accountId')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({
    summary: 'Get feed list',
    description: 'Get feed list',
  })
  @ApiOkResponse({ type: [FeedDto] })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @Get('/schools/:schoolId/feeds')
  public async getBySchoolId(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Query() query: FeedQueryDto,
  ): Promise<FeedDto[]> {
    return this.feedService.getBySchoolId(accountId, schoolId, query);
  }

  @ApiOperation({
    summary: 'Create a feed',
    description: 'Create a feed',
  })
  @ApiOkResponse({ type: FeedDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @ApiResponse({ status: 400, type: InvalidAccountException })
  @Post('/schools/:schoolId/feeds')
  public async create(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Body() input: CreateFeedDto,
  ): Promise<FeedDto> {
    return this.feedService.create(accountId, schoolId, input);
  }

  @ApiOperation({
    summary: 'Update a feed',
    description: 'Update a feed',
  })
  @ApiOkResponse({ type: FeedDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @ApiResponse({ status: 404, type: FeedNotFoundException })
  @ApiResponse({ status: 400, type: InvalidAccountException })
  @ApiResponse({ status: 400, type: InvalidFeedException })
  @Put('/schools/:schoolId/feeds/:feedId')
  public async update(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body() input: UpdateFeedDto,
  ): Promise<FeedDto> {
    return this.feedService.update(accountId, schoolId, feedId, input);
  }

  @ApiOperation({
    summary: 'Delete a feed',
    description: 'Delete a feed',
  })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @ApiResponse({ status: 404, type: FeedNotFoundException })
  @ApiResponse({ status: 400, type: InvalidAccountException })
  @ApiResponse({ status: 400, type: InvalidFeedException })
  @Delete('/schools/:schoolId/feeds/:feedId')
  public async delete(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<void> {
    return this.feedService.delete(accountId, schoolId, feedId);
  }
}
