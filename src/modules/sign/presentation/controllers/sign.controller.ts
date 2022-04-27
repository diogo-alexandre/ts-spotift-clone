import { Body, Controller, Post } from '@nestjs/common';
import { AuthInfo } from '../../../../shared/interfaces/auth-info.interface';

import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { SignService } from '../../application/services/sign.service';
import { SignInDTO } from '../dtos/sign-in.dto';
import { SignUpDTO } from '../dtos/sign-up.dto';

@Controller('/sign')
export class SignController {
  constructor (
    private readonly signService: SignService
  ) { }

  @Post('/in')
  async login (@Body() { email, password }: SignInDTO): Promise<AuthInfo> {
    return await this.signService.login(email, password);
  }

  @Post('/up')
  async register (@Body() payload: SignUpDTO): Promise<Profile> {
    return await this.signService.register(payload);
  }
}
