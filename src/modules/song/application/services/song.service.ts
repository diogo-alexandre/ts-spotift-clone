import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ReleaseService } from '../../../release/application/services/release.service';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { ISongRepository } from '../repositories/song.repository';
import { Song } from '../../infra/typeorm/entities/song.entity';
import { File } from '../../../../shared/entities/file.entity';
import { StorageService } from '../../../storage/application/services/storage.service';
import { QuerySongDTO } from '../../presentation/dtos/query-song.dto';
import { PaginationDTO } from '../../../../shared/dtos/pagination.dto';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { CreateSongDTO } from '../../presentation/dtos/create-song.dto';
import { ArtistService } from '../../../artist/application/services/artist.service';
import { Artist } from '../../../artist/infra/typeorm/entities/artist.entity';

@Injectable()
export class SongService {
  constructor (
    @Inject('ISongRepository')
    private readonly songRepository: ISongRepository,
    private readonly artistService: ArtistService,
    private readonly releaseService: ReleaseService,
    private readonly storageService: StorageService
  ) { }

  async create (user: Profile, payload: CreateSongDTO, source: File): Promise<Song> {
    const release = await this.releaseService.detail(payload.releaseId);

    if (release === null) {
      throw new NotFoundException(`Release can not be found with id = "${payload.releaseId}"`);
    }

    const notExists: Array<{ id: string, index: number}> = [];

    const participants = await Promise.all(
      Array.from(payload.participants)
        .map(async (id: string, index: number) => {
          if (id !== release.artist.id) {
            try {
              return await this.artistService.detail(id);
            } catch (ex) {
              console.log(ex);
              if (ex instanceof NotFoundException) {
                notExists.push({ id, index });
              } else {
                throw ex;
              }
            }
          }
        })
    );

    if (notExists.length > 0) throw new BadRequestException(notExists);

    participants.push(release.artist);

    return await this.storageService.upload(source)
      .then(async media => await this.songRepository.create({
        name: payload.name,
        participants: participants.filter(participant => participant !== null) as Artist[],
        release
      }, media));
  }

  async find (query: QuerySongDTO, pagination: PaginationDTO): Promise<Paginate<Song>> {
    return await this.songRepository.find(query, pagination);
  }
}
