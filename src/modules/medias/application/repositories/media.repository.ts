import { Media } from '../../infra/typeorm/entities/media.entity';

export interface IMediaRepository {
  create: (media: Media) => Promise<Media>
  findByPath: (path: string) => Promise<Media | null>
}
