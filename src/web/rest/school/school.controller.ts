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

@Controller('/users/:userId/schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get(':schoolId')
  public async getById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<SchoolDto> {
    return this.schoolService.getById(userId, schoolId);
  }

  @Post()
  public async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() input: CreateSchoolDto,
  ): Promise<SchoolDto> {
    return this.schoolService.create(userId, input);
  }
}
