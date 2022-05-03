import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit: number = 10

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page: number = 1
}
