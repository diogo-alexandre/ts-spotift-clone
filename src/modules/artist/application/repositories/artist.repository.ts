import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../../presentation/dtos/create-artist.dto';

export interface IArtistRepository {
  create: (artistDTO: CreateArtistDTO, profile: Profile) => Promise<Artist>
}
