import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../../presentation/dtos/create-artist.dto';
import { QueryArtistDTO } from '../../presentation/dtos/query-artist.dto';
import { IArtistRepository } from '../repositories/artist.repository';

@Injectable()
export class ArtistService {
  constructor (
    @Inject('IArtistRepository')
    private readonly artistRepository: IArtistRepository
  ) { }

  async create (artistDTO: CreateArtistDTO, profile: Profile): Promise<Artist> {
    return await this.artistRepository.create(artistDTO, profile);
  }

  async detail (id: string): Promise<Artist> {
    const artist = await this.artistRepository.detail(id);

    if (artist === null) {
      throw new NotFoundException(`Artist can not be found with id = "${id}"`);
    }

    return artist;
  }

  async find (query: QueryArtistDTO, pagination: PaginationDTO): Promise<Paginate<Artist>> {
    return await this.artistRepository.find(query, pagination);
  }
}
