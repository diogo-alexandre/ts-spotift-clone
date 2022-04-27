import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '../../infra/typeorm/entities/profile.entity';
import { IProfileRepository } from '../repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor (
    @Inject('IProfileRepository')
    private readonly profileRepository: IProfileRepository
  ) { }

  async findById (id: string): Promise<Profile> {
    const profile = await this.profileRepository.findById(id);

    if (profile === null) {
      throw new NotFoundException(`Profile cannot be found with id = "${id}"`);
    }

    return profile;
  }
}
