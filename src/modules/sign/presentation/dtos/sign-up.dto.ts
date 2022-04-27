import { IsEmail, IsString, Length } from 'class-validator';
import { IsEqualTo } from '../../../../shared/decorators/validations/is-equal-to.decorator';

export class SignUpDTO {
  @IsString()
  @Length(1, 36)
  name!: string

  @IsString()
  @IsEmail()
  email!: string

  @IsString()
  @Length(5)
  password!: string

  @IsString()
  @Length(5)
  @IsEqualTo('password')
  confirmPassword!: string
}
