import { IsOptional, IsString, Length } from 'class-validator';
import { Like } from 'typeorm';

export class QueryReleaseDTO {
  @IsString()
  @Length(0, 30)
  @IsOptional()
  name!: string

  get query (): any {
    return {
      name: Like(`%${this.name ?? ''}%`)
    };
  }
}
