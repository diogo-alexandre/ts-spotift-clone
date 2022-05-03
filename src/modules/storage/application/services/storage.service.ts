import { Inject, Injectable } from '@nestjs/common';

import { MediaService } from '../../../medias/application/services/media.service';
import { Media } from '../../../medias/infra/typeorm/entities/media.entity';
import { IStorageRepository } from '../repositories/storage.repository';
import { File } from '../../../../shared/entities/file.entity';
import { Virtual } from '../environments/virtual.environment';

@Injectable()
export class StorageService {
  constructor (
    @Inject('IStorageRepository')
    private readonly storageRepository: IStorageRepository<Virtual>,
    private readonly mediaService: MediaService
    ) { }

  async upload (file: File): Promise<Media> {
    return await this.storageRepository.upload(file)
      .then(async media => await this.mediaService.save(media));
  }
}
