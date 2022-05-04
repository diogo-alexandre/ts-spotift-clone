import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from './infra/typeorm/entities/song.entity';
import { SongRepository } from './infra/typeorm/repositories/song.repository';
import { SongController } from './presentation/controllers/song.controller';
import { SongService } from './application/services/song.service';
import { ReleaseModule } from '../release/release.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song]),
    ArtistModule,
    ReleaseModule
  ],
  controllers: [SongController],
  providers: [
    SongService,
    {
      provide: 'ISongRepository',
      useClass: SongRepository
    }
  ],
  exports: [SongService]
})
export class SongModule { }
