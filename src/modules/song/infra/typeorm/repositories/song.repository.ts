import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ISongRepository } from '../../../application/repositories/song.repository';
import { Media } from '../../../../medias/infra/typeorm/entities/media.entity';
import { SongDTO } from '../../../presentation/dtos/song.dto';
import { Song } from '../entities/song.entity';

@Injectable()
export class SongRepository implements ISongRepository {
  constructor (
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>
  ) { }

  async create (payload: SongDTO, media: Media): Promise<Song> {
    const song = this.songRepository.create({
      name: payload.name ?? media.name,
      release: { id: payload.releaseId },
      media,
      duration: 0
    });

    return await this.songRepository.save(song);
  }
}
