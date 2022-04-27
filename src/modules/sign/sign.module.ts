import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SignService } from './application/services/sign.service';

import { SignController } from './presentation/controllers/sign.controller';

@Module({
  imports: [UserModule],
  controllers: [SignController],
  providers: [SignService]
})
export class SignModule { }
