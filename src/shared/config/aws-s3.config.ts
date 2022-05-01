import { ConfigService } from '@nestjs/config';
import { Endpoint, S3 } from 'aws-sdk';

export function AwsS3Config (configService: ConfigService): S3.ClientConfiguration {
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
