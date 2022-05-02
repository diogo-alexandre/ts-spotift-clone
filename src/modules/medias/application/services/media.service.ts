import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IMediaRepository } from '../repositories/media.repository';
import { Media } from '../../infra/typeorm/entities/media.entity';
import { File } from '../../../../shared/entities/file.entity';

@Injectable()
export class MediaService {
  constructor (
    @Inject('IMediaRepository')
    private readonly mediaRepository: IMediaRepository
  ) { }

  async create (files: File[]): Promise<Media[]> {
    const medias = files.map(file => Media.parse(file));
    return await this.mediaRepository.create(medias);
  }

  async findByPath (path: string): Promise<Media> {
    const media = await this.mediaRepository.findByPath(path);

    if (media === null) {
      throw new NotFoundException(`Media cannot be found with path = "${path}"`);
    }

    return media;
  }
}
