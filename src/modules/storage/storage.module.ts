import { MulterModule } from '@nestjs/platform-express';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { LocalStorageEngine } from './application/engines/local-storage.util';
import { StorageService } from './application/services/storage.service';
import { FileSystem } from './application/services/file-system.service';
import { S3Repository } from './infra/s3/s3.repository';
import { S3Config } from '../../shared/config/s3.config';
import { MediaModule } from '../medias/media.module';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [StorageModule],
      useFactory: (fileSystem: FileSystem) => ({ storage: new LocalStorageEngine(fileSystem) }),
      inject: [FileSystem]
    }),
    ConfigModule,
    MediaModule
  ],
  providers: [
    StorageService,
    FileSystem,
    {
      provide: S3,
      useFactory: (configService: ConfigService) => { return new S3(S3Config(configService)); },
      inject: [ConfigService]
    },
    {
      provide: 'IStorageRepository',
      useClass: S3Repository
    }
  ],
  exports: [MulterModule, StorageService, FileSystem]
})
export class StorageModule { }
