import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SchoolService } from '../../../use-case/school/service';
import { CreateSchoolDto, SchoolDto } from 'src/type/dto/school.dto';

@Controller('/accounts/:accountId/schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

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
}
