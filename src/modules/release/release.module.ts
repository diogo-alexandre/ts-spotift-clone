import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReleaseRepository } from './infra/typeorm/repositories/release.repository';
import { ReleaseController } from './presentation/controllers/release.controller';
import { ReleaseService } from './application/services/release.service';
import { Release } from './infra/typeorm/entities/release.entity';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Release]), ArtistModule],
  controllers: [ReleaseController],
  providers: [
    ReleaseService,
    {
      provide: 'IReleaseRepository',
      useClass: ReleaseRepository
    }
  ],
  exports: [ReleaseService]
})
export class ReleaseModule { }
