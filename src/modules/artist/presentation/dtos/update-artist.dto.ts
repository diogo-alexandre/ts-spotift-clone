import { IsString, Length } from 'class-validator';

export class UpdateArtistDTO {
  @IsString()
  @Length(1, 60)
  name!: string

  @IsString()
  @Length(0, 140)
  about!: string
}
