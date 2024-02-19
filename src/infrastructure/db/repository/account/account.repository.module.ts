import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../entity';
import { AccountRepository } from './account.repository';

const repository = {
  provide: 'AccountRepository',
  useClass: AccountRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [repository],
  exports: [repository],
})
export class AccountRepositoryModule {}
