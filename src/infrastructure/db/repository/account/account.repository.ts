import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountEntity } from 'src/infrastructure/db/entity';
import {
  Account,
  CreateAccount,
  AccountMapper,
  IAccountRepository,
} from 'src/domain/account';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  public async findById(id: number): Promise<Account | null> {
    const entity = await this.accountRepository.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    return AccountMapper.of(
      entity.id,
      entity.type,
      entity.email,
      entity.name,
      entity.password,
    );
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const entity = await this.accountRepository.findOne({
      where: { email },
    });

    if (!entity) {
      return null;
    }

    return AccountMapper.of(
      entity.id,
      entity.type,
      entity.email,
      entity.name,
      entity.password,
    );
  }

  public async create(input: CreateAccount): Promise<Account> {
    const entity = await this.accountRepository.save(
      this.accountRepository.create({ ...input }),
    );

    return AccountMapper.of(
      entity.id,
      entity.type,
      entity.email,
      entity.name,
      entity.password,
    );
  }
}
