import { Body, Controller, Post } from '@nestjs/common';

import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { SignService } from '../../application/services/sign.service';
import { SignUpDTO } from '../dtos/sign-up.dto';

@Controller('/sign')
export class SignController {
  constructor (
    private readonly signService: SignService
  ) { }

  @Post('/in')
  async login (): Promise<void> {
    throw new Error('Not Implemented!');
  }

  @Post('/up')
  async register (@Body() payload: SignUpDTO): Promise<Profile> {
    return await this.signService.register(payload);
  }
}
