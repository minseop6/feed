import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import { School } from 'src/domain/school/school';

export class SchoolDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public address: string;

  @Expose()
  public userId: number;

  public static from(school: School): SchoolDto {
    return plainToClass(SchoolDto, school, {
      excludeExtraneousValues: true,
    });
  }
}

export class CreateSchoolDto {
  @IsString()
  public name: string;

  @IsString()
  public region: string;
}
