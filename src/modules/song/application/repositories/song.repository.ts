import { Media } from '../../../medias/infra/typeorm/entities/media.entity';
import { Song } from '../../infra/typeorm/entities/song.entity';
import { SongDTO } from '../../presentation/dtos/song.dto';

export interface ISongRepository {
  create: (songDTO: SongDTO, media: Media) => Promise<Song>
}
