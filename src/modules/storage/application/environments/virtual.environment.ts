import { File } from '../../../../shared/entities/file.entity';
import { Media } from '../../../medias/infra/typeorm/entities/media.entity';

export interface Virtual {
  upload: (file: File) => Promise<Media>
}
