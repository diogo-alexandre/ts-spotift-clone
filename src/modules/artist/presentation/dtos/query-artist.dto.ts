import { IsOptional, IsString, Length } from 'class-validator';
import { Like } from 'typeorm';

export class QueryArtistDTO {
  @IsString()
  @IsOptional()
  @Length(1, 60)
  name?: string

  get query (): any {
    return {
      name: Like(`%${this.name ?? ''}%`)
    };
  }
}
