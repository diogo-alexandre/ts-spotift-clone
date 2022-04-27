import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../../presentation/dtos/create-artist.dto';
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
}
