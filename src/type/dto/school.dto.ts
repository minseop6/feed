import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { School } from 'src/domain/school/school';

export class SchoolDto {
  @ApiProperty({ type: Number })
  @Expose()
  public id: number;

  @ApiProperty({ type: String })
  @Expose()
  public name: string;

  @ApiProperty({ type: String })
  @Expose()
  public address: string;

  @ApiProperty({ type: Number })
  @Expose()
  public accountId: number;

  public static from(school: School): SchoolDto {
    return plainToClass(SchoolDto, school, {
      excludeExtraneousValues: true,
    });
  }
}

export class CreateSchoolDto {
  @ApiProperty({ type: String })
  @IsString()
  public name: string;

  @ApiProperty({ type: String })
  @IsString()
  public region: string;
}
