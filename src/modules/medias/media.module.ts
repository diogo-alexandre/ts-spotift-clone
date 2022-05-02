import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './application/services/media.service';
import { Media } from './infra/typeorm/entities/media.entity';
import { MediaRepository } from './infra/typeorm/repositories/media.repository';
import { MediaController } from './presentation/controllers/media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: 'IMediaRepository',
      useClass: MediaRepository
    }
  ],
  exports: [MediaService]
})
export class MediaModule { }
