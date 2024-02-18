import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AccountService } from 'src/use-case/account/service';
import { AccountDto, CreateAccountDto } from 'src/type/dto/account.dto';

@Controller('/Accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AccountDto> {
    return this.accountService.getById(id);
  }

  @Post()
  public async create(@Body() input: CreateAccountDto): Promise<AccountDto> {
    return this.accountService.create(input);
  }
}
