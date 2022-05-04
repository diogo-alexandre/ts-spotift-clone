import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { ArtistService } from '../../../artist/application/services/artist.service';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Release } from '../../infra/typeorm/entities/release.entity';
import { CreateReleaseDTO } from '../../presentation/dtos/create-release.dto';
import { QueryReleaseDTO } from '../../presentation/dtos/query-release.dto';

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

  async detail (id: string): Promise<Release> {
    const release = await this.releaseRepository.findById(id);

    if (release === null) {
      throw new NotFoundException(`Release can not be found with id = "${id}"`);
    }

    return release;
  }

  async find (query: QueryReleaseDTO, pagination: PaginationDTO): Promise<Paginate<Release>> {
    return await this.releaseRepository.find(query, pagination);
  }
}
