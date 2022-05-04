import { Inject, Injectable } from '@nestjs/common';

import { Media } from '../../../medias/infra/typeorm/entities/media.entity';
import { IStorageRepository } from '../repositories/storage.repository';
import { File } from '../../../../shared/entities/file.entity';
import { Virtual } from '../environments/virtual.environment';

@Injectable()
export class StorageService {
  constructor (
    @Inject('IStorageRepository')
    private readonly storageRepository: IStorageRepository<Virtual>
    ) { }

  async upload (file: File): Promise<Media> {
    return await this.storageRepository.upload(file);
  }
}
