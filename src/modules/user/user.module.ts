import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/services/user.service';

import { User } from './infra/typeorm/entities/user.entity';
import { UserRepository } from './infra/typeorm/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
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
