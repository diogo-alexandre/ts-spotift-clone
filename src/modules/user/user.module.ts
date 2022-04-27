import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileRepository } from './infra/typeorm/repositories/profile.repository';
import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { UserService } from './application/services/user.service';
import { Profile } from './infra/typeorm/entities/profile.entity';
import { User } from './infra/typeorm/entities/user.entity';
import { ProfileService } from './application/services/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [
    UserService,
    ProfileService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    },
    {
      provide: 'IProfileRepository',
      useClass: ProfileRepository
    }
  ],
  exports: [UserService, ProfileService]
})
export class UserModule { }
