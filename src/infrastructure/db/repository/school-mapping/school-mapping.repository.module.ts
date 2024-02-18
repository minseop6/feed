import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolMappingEntity } from '../../entity';
import { SchoolMappingRepository } from './school-mapping.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolMappingEntity])],
  providers: [SchoolMappingRepository],
  exports: [SchoolMappingRepository],
})
export class SchoolMappingRepositoryModule {}
