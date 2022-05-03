import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ArtistModule } from './modules/artist/artist.module';
import { ReleaseModule } from './modules/release/release.module';
import { SongModule } from './modules/song/song.module';
import { UserModule } from './modules/user/user.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { SignModule } from './modules/sign/sign.module';
import { StorageModule } from './modules/storage/storage.module';
import { MediaModule } from './modules/medias/media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StorageModule,
    DatabaseModule,
    ArtistModule,
    ReleaseModule,
    SongModule,
    UserModule,
    PlaylistModule,
    SignModule,
    MediaModule
  ]
})
export class AppModule {}
