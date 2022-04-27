import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsEmail()
  email!: string

  @IsString()
  @Length(5)
  password!: string
}
