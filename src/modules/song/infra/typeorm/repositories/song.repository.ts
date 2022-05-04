import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ISongRepository } from '../../../application/repositories/song.repository';
import { Media } from '../../../../medias/infra/typeorm/entities/media.entity';
import { Song } from '../entities/song.entity';
import { QuerySongDTO } from '../../../presentation/dtos/query-song.dto';
import { PaginationDTO } from '../../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../../shared/interfaces/paginate.interface';
import { SongDTO } from '../../../presentation/dtos/song.dto';

@Injectable()
export class SongRepository implements ISongRepository {
  constructor (
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>
  ) { }

  async create (songDTO: SongDTO, media: Media): Promise<Song> {
    const song = this.songRepository.create({
      ...songDTO,
      media,
      duration: 0
    });

    return await this.songRepository.save(song);
  }

  async find ({ query }: QuerySongDTO, pagination: PaginationDTO): Promise<Paginate<Song>> {
    const limit = pagination.limit ?? 10;
    const page = pagination.page ?? 1;

    const [songs, total] = await this.songRepository.findAndCount({ where: query, take: limit, skip: (page - 1) * limit });

    return {
      data: songs,
      total,
      limit,
      page,
      pages: Math.ceil(total / limit)
    };
  }
}
