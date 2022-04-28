import { Type } from 'class-transformer';
import { IsDate, IsString, IsUUID, Length } from 'class-validator';

export class CreateReleaseDTO {
  @IsUUID()
  @IsString()
  artistId!: string

  @IsString()
  @Length(1, 30)
  name!: string

  @Type(() => Date)
  @IsDate()
  releaseDate!: Date
}
