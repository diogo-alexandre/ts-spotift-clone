import { Media } from '../../infra/typeorm/entities/media.entity';

export interface IMediaRepository {
  create: (medias: Media[]) => Promise<Media[]>
  findByPath: (path: string) => Promise<Media | null>
}
