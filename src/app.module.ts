import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ArtistModule } from './modules/artist/artist.module';
import { ReleaseModule } from './modules/release/release.module';
import { SongModule } from './modules/song/song.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ArtistModule,
    ReleaseModule,
    SongModule,
    UserModule
  ]
})
export class AppModule {}
