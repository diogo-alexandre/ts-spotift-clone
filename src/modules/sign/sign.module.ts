import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SignController } from './presentation/controllers/sign.controller';
import { SignService } from './application/services/sign.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstant } from '../../shared/constants/auth.constant';
import { JwtStrategy } from './application/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: AuthConstant.secret,
      signOptions: { expiresIn: AuthConstant.expiresIn }
    })
  ],
  providers: [SignService, JwtStrategy],
  controllers: [SignController]
})
export class SignModule { }
