import { Expose, Transform, plainToClass } from 'class-transformer';
import { IsInt, IsOptional, IsString, isEmpty } from 'class-validator';
import { Feed } from 'src/domain/feed';

export class FeedDto {
  @Expose()
  public id: number;

  @Expose()
  public schoolId: number;

  @Expose()
  public title: string;

  @Expose()
  public content: string;

  @Expose()
  public createdAt: Date;

  public static from(feed: Feed) {
    return plainToClass(FeedDto, feed, { excludeExtraneousValues: true });
  }
}

export class CreateFeedDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;
}

export class UpdateFeedDto {
  @IsInt()
  public id: number;

  @IsString()
  public title: string;

  @IsString()
  public content: string;
}

export class FeedQueryDto {
  @Transform(({ value }) => (!isEmpty(value) ? Number(value) : value))
  @IsInt()
  @IsOptional()
  public page?: number;

  @Transform(({ value }) => (!isEmpty(value) ? Number(value) : value))
  @IsInt()
  @IsOptional()
  public take?: number;
}
