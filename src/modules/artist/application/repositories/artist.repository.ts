import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { Artist } from '../../infra/typeorm/entities/artist.entity';
import { CreateArtistDTO } from '../../presentation/dtos/create-artist.dto';
import { QueryArtistDTO } from '../../presentation/dtos/query-artist.dto';

export interface IArtistRepository {
  create: (artistDTO: CreateArtistDTO, profile: Profile) => Promise<Artist>
  detail: (id: string) => Promise<Artist | null>
  find: (query: QueryArtistDTO, paginate: PaginationDTO) => Promise<Paginate<Artist>>
}
