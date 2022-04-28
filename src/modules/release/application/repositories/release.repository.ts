import { Artist } from '../../../artist/infra/typeorm/entities/artist.entity';
import { Release } from '../../infra/typeorm/entities/release.entity';
import { CreateReleaseDTO } from '../../presentation/dtos/create-release.dto';

export interface IReleaseRepository {
  create: (releaseDTO: CreateReleaseDTO, artist: Artist) => Promise<Release>
}
