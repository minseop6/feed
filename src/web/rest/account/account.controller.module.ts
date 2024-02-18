import { Module } from '@nestjs/common';
import { AccountModule } from 'src/use-case/account/account.module';
import { AccountController } from './account.controller';

@Module({
  imports: [AccountModule],
  controllers: [AccountController],
})
export class AccountControllerModule {}
