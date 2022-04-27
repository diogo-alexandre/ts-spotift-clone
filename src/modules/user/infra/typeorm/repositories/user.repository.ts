import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from '../../../presentation/dtos/create-user.dto';
import { IUserRepository } from '../../../application/repositories/user.repository';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create (userDTO: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userDTO);
    return await this.userRepository.save(user);
  }
}
