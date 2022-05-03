import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../../presentation/dtos/create-artist.dto';
import { QueryArtistDTO } from '../../presentation/dtos/query-artist.dto';
import { UpdateArtistDTO } from '../../presentation/dtos/update-artist.dto';
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

  async remove (id: string, user: Profile): Promise<any> {
    const artist = await this.artistRepository.detail(id);

    if (artist === null) {
      throw new NotFoundException(`Artist can not be found with id = "${id}"`);
    }

    if (artist.userId !== user.id) {
      throw new UnauthorizedException('You not have authorization to perform this action.');
    }

    return await this.artistRepository.delete(artist);
  }

  async update (id: string, payload: UpdateArtistDTO, user: Profile): Promise<Artist> {
    const artist = await this.artistRepository.detail(id);

    if (artist === null) {
      throw new NotFoundException(`Artist can not be found with id = "${id}"`);
    }

    if (artist.userId !== user.id) {
      throw new UnauthorizedException('You not have authorization to perform this action.');
    }

    return await this.artistRepository.update(artist, payload);
  }
}
