import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SchoolService } from '../../../use-case/school/service';
import { CreateSchoolDto, SchoolDto } from 'src/type/dto/school.dto';

@Controller('/accounts/:accountId/schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('subscriptions')
  public async getSubscriptions(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<SchoolDto[]> {
    return this.schoolService.getSubscriptions(accountId);
  }

  @Get(':schoolId')
  public async getById(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<SchoolDto> {
    return this.schoolService.getById(accountId, schoolId);
  }

  @Post()
  public async create(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() input: CreateSchoolDto,
  ): Promise<SchoolDto> {
    return this.schoolService.create(accountId, input);
  }

  @Post(':schoolId/subscriptions')
  public async subscribe(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<SchoolDto> {
    return this.schoolService.subscribe(accountId, schoolId);
  }

  @Put(':schoolId/subscriptions/:subscriptionId')
  public async unsubscribe(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<void> {
    return this.schoolService.unsubscribe(accountId, schoolId);
  }
}
