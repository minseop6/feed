import { Expose, plainToClass } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { Account } from 'src/domain/account/account';
import { AccountType } from '../enum/account-type.enum';

export class AccountDto {
  @Expose()
  public id: number;

  @Expose()
  public type: AccountType;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  public static from(account: Account): AccountDto {
    return plainToClass(AccountDto, account, {
      excludeExtraneousValues: true,
    });
  }
}

export class CreateAccountDto {
  @IsEnum(AccountType)
  public type: AccountType;

  @IsString()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public password: string;
}
