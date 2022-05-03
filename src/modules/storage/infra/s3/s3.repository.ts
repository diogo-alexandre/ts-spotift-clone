import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import { S3 } from 'aws-sdk';

import { IStorageRepository } from '../../application/repositories/storage.repository';
import { Media } from '../../../medias/infra/typeorm/entities/media.entity';
import { AppConstants } from '../../../../shared/constants/app.constant';
import { File } from '../../../../shared/entities/file.entity';
import { Virtual } from '../../application/environments/virtual.environment';

@Injectable()
export class S3Repository implements IStorageRepository<Virtual> {
  constructor (
    private readonly s3: S3
  ) { }

  async upload (file: File, bucket?: string): Promise<Media> {
    const pass = new Stream.PassThrough();

    const resolve = this.s3.upload({
      Bucket: bucket ?? AppConstants.aws.s3.bucket,
      Key: file.id,
      Body: pass
    }).promise();

    file.stream.pipe(pass);

    return await resolve.then(async () => {
      await file.delete();
      return Media.parse(file);
    });
  }
}
