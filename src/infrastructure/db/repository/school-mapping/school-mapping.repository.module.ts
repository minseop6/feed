import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolMappingEntity } from '../../entity';
import { SchoolMappingRepository } from './school-mapping.repository';

const repository = {
  provide: 'SchoolMappingRepository',
  useClass: SchoolMappingRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([SchoolMappingEntity])],
  providers: [repository],
  exports: [repository],
})
export class SchoolMappingRepositoryModule {}
