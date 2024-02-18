import { Module } from '@nestjs/common';

import { AccountService } from './service';
import { AccountRepositoryModule } from 'src/infrastructure/db/repository';

@Module({
  imports: [AccountRepositoryModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
