import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { UserService } from './application/services/user.service';
import { Profile } from './infra/typeorm/entities/profile.entity';
import { User } from './infra/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    }
  ],
  exports: [UserService]
})
export class UserModule { }
