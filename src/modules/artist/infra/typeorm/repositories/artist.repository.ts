import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../../../user/infra/typeorm/entities/profile.entity';
import { IArtistRepository } from '../../../application/repositories/artist.repository';
import { CreateArtistDTO } from '../../../presentation/dtos/create-artist.dto';
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
    return await this.artistRepository.findOneBy({ id });
  }
}
