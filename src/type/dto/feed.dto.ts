import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, plainToClass } from 'class-transformer';
import { IsInt, IsOptional, IsString, isEmpty } from 'class-validator';
import { Feed } from 'src/domain/feed';

export class FeedDto {
  @ApiProperty({ type: Number })
  @Expose()
  public id: number;

  @ApiProperty({ type: Number })
  @Expose()
  public schoolId: number;

  @ApiProperty({ type: String })
  @Expose()
  public title: string;

  @ApiProperty({ type: String })
  @Expose()
  public content: string;

  @ApiProperty({ type: Date })
  @Expose()
  public createdAt: Date;

  public static from(feed: Feed) {
    return plainToClass(FeedDto, feed, { excludeExtraneousValues: true });
  }
}

export class CreateFeedDto {
  @ApiProperty({ type: String })
  @IsString()
  public title: string;

  @ApiProperty({ type: String })
  @IsString()
  public content: string;
}

export class UpdateFeedDto {
  @ApiProperty({ type: Number })
  @IsInt()
  public id: number;

  @ApiProperty({ type: String })
  @IsString()
  public title: string;

  @ApiProperty({ type: String })
  @IsString()
  public content: string;
}

export class FeedQueryDto {
  @ApiProperty({ type: Number, required: false })
  @Transform(({ value }) => (!isEmpty(value) ? Number(value) : value))
  @IsInt()
  @IsOptional()
  public page?: number;

  @ApiProperty({ type: Number, required: false })
  @Transform(({ value }) => (!isEmpty(value) ? Number(value) : value))
  @IsInt()
  @IsOptional()
  public take?: number;
}
