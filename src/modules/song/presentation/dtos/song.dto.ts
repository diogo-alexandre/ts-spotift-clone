import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class SongDTO {
  @IsString()
  @Length(1, 30)
  @IsOptional()
  name?: string

  @IsString()
  @IsUUID(4)
  releaseId!: string
}
