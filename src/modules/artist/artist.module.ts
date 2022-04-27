import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './application/services/artist.service';

import { Artist } from './infra/typeorm/entities/artist.entity';
import { ArtistRepository } from './infra/typeorm/repositories/artist.repository';
import { ArtistController } from './presentation/controllers/artist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'IArtistRepository',
      useClass: ArtistRepository
    }
  ]
})
export class ArtistModule { }
