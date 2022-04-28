import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ArtistService } from '../../../artist/application/services/artist.service';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Release } from '../../infra/typeorm/entities/release.entity';
import { CreateReleaseDTO } from '../../presentation/dtos/create-release.dto';

import { IReleaseRepository } from '../repositories/release.repository';

@Injectable()
export class ReleaseService {
  constructor (
    @Inject('IReleaseRepository')
    private readonly releaseRepository: IReleaseRepository,
    private readonly artistService: ArtistService
  ) { }

  async create (releaseDTO: CreateReleaseDTO, user: Profile): Promise<Release> {
    const artist = await this.artistService.detail(releaseDTO.artistId);

    if (artist.profile.id !== user.id) {
      throw new UnauthorizedException('You not have authorization to perform this action.');
    }

    return await this.releaseRepository.create(releaseDTO, artist);
  }
}
