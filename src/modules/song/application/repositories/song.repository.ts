import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { Media } from '../../../medias/infra/typeorm/entities/media.entity';
import { Song } from '../../infra/typeorm/entities/song.entity';
import { QuerySongDTO } from '../../presentation/dtos/query-song.dto';
import { SongDTO } from '../../presentation/dtos/song.dto';

export interface ISongRepository {
  create: (song: SongDTO, media: Media) => Promise<Song>
  find: (query: QuerySongDTO, paginate: PaginationDTO) => Promise<Paginate<Song>>
}
