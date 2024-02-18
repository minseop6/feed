import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';
import { SchoolService } from './service';
import {
  SchoolMappingRepositoryModule,
  SchoolRepositoryModule,
} from 'src/infrastructure/db/repository';

@Module({
  imports: [
    AccountModule,
    SchoolRepositoryModule,
    SchoolMappingRepositoryModule,
  ],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
