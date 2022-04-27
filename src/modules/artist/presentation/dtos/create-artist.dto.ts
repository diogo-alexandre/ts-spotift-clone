import { IsOptional, IsString, Length } from 'class-validator';

export class CreateArtistDTO {
  @IsString()
  @Length(1, 60)
  name!: string

  @IsString()
  @IsOptional()
  @Length(1, 140)
  about!: string
}
