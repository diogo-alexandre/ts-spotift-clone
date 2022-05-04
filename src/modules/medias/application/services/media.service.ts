import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IMediaRepository } from '../repositories/media.repository';
import { Media } from '../../infra/typeorm/entities/media.entity';
import { File } from '../../../../shared/entities/file.entity';
import { StorageService } from '../../../storage/application/services/storage.service';

@Injectable()
export class MediaService {
  constructor (
    @Inject('IMediaRepository')
    private readonly mediaRepository: IMediaRepository,
    private readonly storageService: StorageService
  ) { }

  async create (file: File): Promise<Media> {
    return await this.storageService.upload(file)
      .then(async media => await this.mediaRepository.create(media));
  }

  async findByPath (path: string): Promise<Media> {
    const media = await this.mediaRepository.findByPath(path);

    if (media === null) {
      throw new NotFoundException(`Media cannot be found with path = "${path}"`);
    }

    return media;
  }
}
