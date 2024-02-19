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
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AccountNotFoundException,
  DuplicateEmailException,
} from 'src/type/exception';

@ApiTags('Account')
@Controller('/Accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: 'Get a account',
    description: 'Get a account',
  })
  @ApiOkResponse({ type: AccountDto })
  @ApiResponse({ status: 404, type: AccountNotFoundException })
  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AccountDto> {
    return this.accountService.getById(id);
  }

  @ApiOperation({
    summary: 'Create a account',
    description: 'Create a account',
  })
  @ApiOkResponse({ type: AccountDto })
  @ApiResponse({ status: 400, type: DuplicateEmailException })
  @Post()
  public async create(@Body() input: CreateAccountDto): Promise<AccountDto> {
    return this.accountService.create(input);
  }
}
