import { Expose, plainToClass } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { Account } from 'src/domain/account/account';
import { AccountType } from '../enum/account-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @Expose()
  @ApiProperty({ type: Number })
  public id: number;

  @Expose()
  @ApiProperty({ enum: AccountType })
  public type: AccountType;

  @Expose()
  @ApiProperty({ type: String })
  public name: string;

  @Expose()
  @ApiProperty({ type: String })
  public email: string;

  public static from(account: Account): AccountDto {
    return plainToClass(AccountDto, account, {
      excludeExtraneousValues: true,
    });
  }
}

export class CreateAccountDto {
  @IsEnum(AccountType)
  @ApiProperty({ enum: AccountType })
  public type: AccountType;

  @IsString()
  @ApiProperty({ type: String })
  public email: string;

  @IsString()
  @ApiProperty({ type: String })
  public name: string;

  @IsString()
  @ApiProperty({ type: String })
  public password: string;
}
