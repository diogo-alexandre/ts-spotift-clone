import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IProfileRepository } from '../../../application/repositories/profile.repository';
import { Profile } from '../entities/profile.entity';

export class ProfileRepository implements IProfileRepository {
  constructor (
    @InjectRepository(Profile)
    private readonly userRepository: Repository<Profile>
  ) { }

  async findById (id: string): Promise<Profile | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
