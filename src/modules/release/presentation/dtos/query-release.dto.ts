import { IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Like } from 'typeorm';

export class QueryReleaseDTO {
  @IsString()
  @Length(0, 30)
  @IsOptional()
  name?: string

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId?: string

  get query (): any {
    return {
      name: Like(`%${this.name ?? ''}%`),
      artist: this.artistId !== undefined ? { id: this.artistId } : {}
    };
  }
}
