import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDTO } from '../../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../../shared/interfaces/paginate.interface';
import { Profile } from '../../../../user/infra/typeorm/entities/profile.entity';
import { IArtistRepository } from '../../../application/repositories/artist.repository';
import { CreateArtistDTO } from '../../../presentation/dtos/create-artist.dto';
import { QueryArtistDTO } from '../../../presentation/dtos/query-artist.dto';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistRepository implements IArtistRepository {
  constructor (
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) { }

  async create (artistDTO: CreateArtistDTO, profile: Profile): Promise<Artist> {
    const artist = this.artistRepository.create({
      ...artistDTO,
      profile
    });

    return await this.artistRepository.save(artist);
  }

  async detail (id: string): Promise<Artist | null> {
    return await this.artistRepository.findOne({
      where: { id }
    });
  }

  async find ({ query }: QueryArtistDTO, pagination: PaginationDTO): Promise<Paginate<Artist>> {
    const limit = pagination.limit ?? 10;
    const page = pagination.page ?? 10;

    const [artists, total] = await this.artistRepository.findAndCount({ where: query, take: limit, skip: (page - 1) * limit });

    return {
      data: artists,
      total,
      limit,
      page,
      pages: Math.ceil(total / limit)
    };
  }

  async delete (artist: Artist): Promise<Artist> {
    return await this.artistRepository.softRemove(artist)
      .then(() => artist);
  }
}
