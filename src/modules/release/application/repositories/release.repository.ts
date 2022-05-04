import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { Artist } from '../../../artist/infra/typeorm/entities/artist.entity';
import { Release } from '../../infra/typeorm/entities/release.entity';
import { CreateReleaseDTO } from '../../presentation/dtos/create-release.dto';
import { QueryReleaseDTO } from '../../presentation/dtos/query-release.dto';

export interface IReleaseRepository {
  create: (releaseDTO: CreateReleaseDTO, artist: Artist) => Promise<Release>
  findById: (id: string) => Promise<Release | null>
  find: (query: QueryReleaseDTO, pagination: PaginationDTO) => Promise<Paginate<Release>>
}
