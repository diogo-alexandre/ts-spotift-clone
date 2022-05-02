import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IMediaRepository } from '../../../application/repositories/media.repository';
import { Media } from '../entities/media.entity';

@Injectable()
export class MediaRepository implements IMediaRepository {
  constructor (
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>
  ) { }

  async create (medias: Media[]): Promise<Media[]> {
    return await this.mediaRepository.manager.transaction(async transaction => {
      return await transaction.save(medias);
    });
  }

  async findByPath (path: string): Promise<Media | null> {
    return await this.mediaRepository.findOneBy({ source: path });
  }
}
