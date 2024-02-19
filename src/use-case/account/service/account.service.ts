import { Inject, Injectable } from '@nestjs/common';

import { AccountNotFoundException } from 'src/type/exception/account-not-found.exception';
import { DuplicateEmailException } from 'src/type/exception/duplicate-email.exception';
import { AccountDto, CreateAccountDto } from 'src/type/dto/account.dto';
import { CreateAccount } from 'src/domain/account/account';
import { IAccountRepository } from 'src/domain/account';

@Injectable()
export class AccountService {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  public async getById(id: number): Promise<AccountDto> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new AccountNotFoundException(`Account is not exists. id: ${id}`);
    }

    return AccountDto.from(account);
  }

  public async create(input: CreateAccountDto): Promise<AccountDto> {
    const existsAccount = await this.accountRepository.findByEmail(input.email);
    if (existsAccount) {
      throw new DuplicateEmailException(
        `Account is already exists. email: ${input.email}`,
      );
    }
    const account = await this.accountRepository.create(
      new CreateAccount(input.type, input.email, input.name, input.password),
    );

    return AccountDto.from(account);
  }
}
