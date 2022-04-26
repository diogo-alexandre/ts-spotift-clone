import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './modules/artist/artist.module';

import { DatabaseModule } from './modules/database/database.module';
import { ReleaseModule } from './modules/release/release.module';
import { SongModule } from './modules/song/song.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ArtistModule,
    ReleaseModule,
    SongModule
  ]
})
export class AppModule {}
