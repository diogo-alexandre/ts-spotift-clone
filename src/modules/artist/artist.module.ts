import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Artist } from './infra/typeorm/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])]
})
export class ArtistModule { }
