import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './infra/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
