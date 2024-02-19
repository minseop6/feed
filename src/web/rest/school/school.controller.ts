import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SchoolService } from '../../../use-case/school/service';
import { CreateSchoolDto, SchoolDto } from 'src/type/dto/school.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AccountNotFoundException,
  InvalidAccountException,
  InvalidSchoolMappingException,
  SchoolNotFoundException,
} from 'src/type/exception';

@ApiTags('School')
@Controller('/accounts/:accountId/schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({
    summary: 'Get subscription list',
    description: 'Get subscription list',
  })
  @ApiOkResponse({ type: [SchoolDto] })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @Get('subscriptions')
  public async getSubscriptions(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<SchoolDto[]> {
    return this.schoolService.getSubscriptions(accountId);
  }

  @ApiOperation({
    summary: 'Get a school',
    description: 'Get a school',
  })
  @ApiOkResponse({ type: SchoolDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @Get(':schoolId')
  public async getById(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<SchoolDto> {
    return this.schoolService.getById(accountId, schoolId);
  }

  @ApiOperation({
    summary: 'Create a school',
    description: 'Create a school',
  })
  @ApiOkResponse({ type: SchoolDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @ApiResponse({ status: 400, type: InvalidAccountException })
  @Post()
  public async create(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() input: CreateSchoolDto,
  ): Promise<SchoolDto> {
    return this.schoolService.create(accountId, input);
  }

  @ApiOperation({
    summary: 'Subscribe a school',
    description: 'Subscribe a school',
  })
  @ApiOkResponse({ type: SchoolDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @ApiResponse({ status: 404, type: SchoolNotFoundException })
  @ApiResponse({ status: 400, type: InvalidAccountException })
  @ApiResponse({ status: 400, type: InvalidSchoolMappingException })
  @Post(':schoolId/subscriptions')
  public async subscribe(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<SchoolDto> {
    return this.schoolService.subscribe(accountId, schoolId);
  }

  @ApiOperation({
    summary: 'Unsubscribe a school',
    description: 'Unsubscribe a school',
  })
  @ApiOkResponse({ type: SchoolDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @ApiResponse({ status: 404, type: SchoolNotFoundException })
  @ApiResponse({ status: 400, type: InvalidAccountException })
  @ApiResponse({ status: 400, type: InvalidSchoolMappingException })
  @Delete(':schoolId/subscriptions')
  public async unsubscribe(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<void> {
    return this.schoolService.unsubscribe(accountId, schoolId);
  }
}
