import { Inject, Injectable } from '@nestjs/common';

import { ReleaseService } from '../../../release/application/services/release.service';
import { Profile } from '../../../user/infra/typeorm/entities/profile.entity';
import { ISongRepository } from '../repositories/song.repository';
import { Song } from '../../infra/typeorm/entities/song.entity';
import { File } from '../../../../shared/entities/file.entity';
import { StorageService } from '../../../storage/application/services/storage.service';
import { SongDTO } from '../../presentation/dtos/song.dto';

@Injectable()
export class SongService {
  constructor (
    @Inject('ISongRepository')
    private readonly songRepository: ISongRepository,
    private readonly releaseService: ReleaseService,
    private readonly storageService: StorageService
  ) { }

  async create (user: Profile, payload: SongDTO, source: File): Promise<Song> {
    const media = await this.storageService.upload(source);
    return await this.songRepository.create(payload, media);
  }
}
