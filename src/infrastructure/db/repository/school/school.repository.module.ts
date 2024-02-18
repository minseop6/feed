import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEntity } from '../../entity';
import { SchoolRepository } from './school.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity])],
  providers: [SchoolRepository],
  exports: [SchoolRepository],
})
export class SchoolRepositoryModule {}
