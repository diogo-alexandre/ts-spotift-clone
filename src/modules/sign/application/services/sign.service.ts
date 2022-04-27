import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AuthConstant } from '../../../../shared/constants/auth.constant';
import { AuthInfo } from '../../../../shared/interfaces/auth-info.interface';

import { UserService } from '../../../user/application/services/user.service';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { SignUpDTO } from '../../presentation/dtos/sign-up.dto';

@Injectable()
export class SignService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login (email: string, password: string): Promise<AuthInfo> {
    const user = await this.userService.findByEmail(email);

    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Password providade is wrong.');
    }

    return {
      access_token: this.jwtService.sign({ ...Profile.parse(user) }),
      expiresIn: AuthConstant.expiresIn,
      type: AuthConstant.type
    };
  }

  async register (signDTO: SignUpDTO): Promise<Profile> {
    return await this.userService.create(signDTO)
      .then(user => Profile.parse(user));
  }
}
