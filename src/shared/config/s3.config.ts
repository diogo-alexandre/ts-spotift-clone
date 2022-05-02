import { ConfigService } from '@nestjs/config';
import { Endpoint, S3 } from 'aws-sdk';

export function S3Config (configService: ConfigService): S3.ClientConfiguration {
  console.log(configService.get('AWS_ACCESS_KEY_ID'));

  return {
    credentials: {
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID') ?? '',
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY') ?? ''
    },
    region: configService.get('AWS_DEFAULT_REGION'),
    endpoint: new Endpoint('http://localhost:4566'),
    s3ForcePathStyle: true
  };
}
