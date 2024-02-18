import { Module } from '@nestjs/common';

import { SchoolService } from './service';
import {
  AccountRepositoryModule,
  SchoolMappingRepositoryModule,
  SchoolRepositoryModule,
} from 'src/infrastructure/db/repository';

@Module({
  imports: [
    AccountRepositoryModule,
    SchoolRepositoryModule,
    SchoolMappingRepositoryModule,
  ],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
