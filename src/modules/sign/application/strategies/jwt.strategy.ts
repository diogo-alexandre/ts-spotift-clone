import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { AuthConstant } from '../../../../shared/constants/auth.constant';
import { ProfileService } from '../../../user/application/services/profile.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly profileService: ProfileService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstant.secret
    });
  }

  async validate (payload: { id: string }): Promise<Profile> {
    return await this.profileService.findById(payload.id);
  }
}
