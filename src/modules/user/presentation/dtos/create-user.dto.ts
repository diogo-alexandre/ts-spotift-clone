import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(1, 36)
  name!: string

  @IsString()
  @IsEmail()
  email!: string

  @IsString()
  @Length(5)
  password!: string
}
