import { Injectable } from '@nestjs/common';

import { UserService } from '../../../user/application/services/user.service';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { SignUpDTO } from '../../presentation/dtos/sign-up.dto';

@Injectable()
export class SignService {
  constructor (
    private readonly userService: UserService
  ) { }

  async register (signDTO: SignUpDTO): Promise<Profile> {
    return await this.userService.create(signDTO)
      .then(user => Profile.parse(user));
  }
}
