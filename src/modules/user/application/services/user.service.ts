import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { CreateUserDTO } from '../../presentation/dtos/create-user.dto';
import { IUserRepository } from '../repositories/user.repository';
import { User } from '../../infra/typeorm/entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) { }

  async create (userDTO: CreateUserDTO): Promise<User> {
    return await this.userRepository.create({
      ...userDTO,
      password: await bcrypt.hash(userDTO.password, 8)
    });
  }

  async findByEmail (email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new NotFoundException(`User cannot be found with email = "${email}"`);
    }

    return user;
  }
}
