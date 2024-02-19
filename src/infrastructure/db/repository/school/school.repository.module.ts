import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEntity } from '../../entity';
import { SchoolRepository } from './school.repository';

const repository = {
  provide: 'SchoolRepository',
  useClass: SchoolRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity])],
  providers: [repository],
  exports: [repository],
})
export class SchoolRepositoryModule {}
