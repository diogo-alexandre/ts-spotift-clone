import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Like } from 'typeorm';

export class QuerySongDTO {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsUUID()
  @IsOptional()
  releaseId?: string

  get query (): any {
    return {
      name: Like(`%${this.name ?? ''}%`),
      release: this.releaseId !== undefined ? { id: this.releaseId } : {}
    };
  }
}
