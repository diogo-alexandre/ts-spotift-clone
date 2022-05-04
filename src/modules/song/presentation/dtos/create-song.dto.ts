import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @Length(1, 30)
  @IsOptional()
  name!: string

  @IsString()
  @IsUUID(4)
  releaseId!: string

  @IsString({ each: true })
  @IsUUID(4, { each: true })
  @IsOptional()
  @Type(() => Set)
  participants: Set<string> = new Set()
}
